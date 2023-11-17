/* eslint-disable @typescript-eslint/no-unused-vars */
import {PermissionsAndroid, View, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapBoxGL, {
  PointAnnotation,
  UserLocation,
  UserLocationRenderMode,
} from '@rnmapbox/maps';
import {Camera} from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import {FAB, Searchbar, Text, IconButton} from 'react-native-paper';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useGetAllFeatureByDatasetId} from '../utils/hooks/DatasetQuery';
import CustomMarker from './CustomMarker';
import {isWithinRange} from '../utils/helper/Algoritms';
import {ACCESSTOKEN, DATASET_ID} from '../utils/helper/Constant';
import CustomGeofence from './CustomGeofence';
import {
  createCircularGeofence,
  isInsideMultiGeofence,
} from '../utils/helper/Geofencing';
import Toast from 'react-native-toast-message';
import {LocalNotification} from '../utils/helper/LocalNotificationHandler';

MapBoxGL.setAccessToken(ACCESSTOKEN);
MapBoxGL.setTelemetryEnabled(false);
MapBoxGL.setWellKnownTileServer('Mapbox');

interface MarkerUserDefined {
  id: any;
  coordinates: any[];
  title?: string;
}

const MapsBox = () => {
  const camera = useRef<Camera>(null);
  const userLocationRef = useRef<UserLocation>(null);
  const [currentPosition, setCurrentPosition] = useState<any>({});
  const [currentCoordinate, setCurrentCoordinate] = useState([
    107.5965, -7.1041,
  ]);
  const [nearestFeatures, setNearestFeatures] = useState<any>([]);
  const [visibleGeofences, setVisibleGeofences] = useState(true);
  const [userInsideGeofences, setUserInsideGeofences] = useState(false);
  const [markerUserDefined, setMarkerUserDefined] = useState<
    MarkerUserDefined[]
  >([]);
  const [mapReady, setMapReady] = useState(false);

  // ? get data feature from API Mapbox
  const {data: dataFeatureByDatasetId, refetch: refetchFeatureByDatasetId} =
    useGetAllFeatureByDatasetId(DATASET_ID);
  // ? get data feature from API Mapbox

  // ? set nearest feature based on current coordinate
  useEffect(() => {
    if (dataFeatureByDatasetId) {
      const nearestFeature: any = dataFeatureByDatasetId?.features?.filter(
        (item: any) => {
          return isWithinRange({
            locationA: currentCoordinate,
            locationB: item.geometry.coordinates,
            range: 0.2,
          });
        },
      );
      if (nearestFeature) {
        const nearestFeaturesWithGeofences = nearestFeature.map(
          (feature: any, index: number) => {
            const geofence = createCircularGeofence({
              centerPoint: feature?.geometry?.coordinates,
              geofenceRadius: 0.0015,
              numberOfPoints: 20,
            });
            return {
              ...feature,
              geofence: geofence,
            };
          },
        );
        setNearestFeatures(nearestFeaturesWithGeofences);
      }
    }
  }, [dataFeatureByDatasetId, currentCoordinate]);
  // ? set nearest feature based on current coordinate

  // ? checking user is in geofence
  useEffect(() => {
    if (nearestFeatures) {
      const isUserInsideGeofence = isInsideMultiGeofence({
        userLocation: currentCoordinate,
        multipleGeofenceCoordinates: nearestFeatures,
      });
      if (isUserInsideGeofence) {
        isUserInsideGeofence.map((item: any) => {
          if (item.insideGeofences === true) {
            console.log(item);
            LocalNotification({channelId: 'warning-channel6', data: item});
          }
          // return Toast.show({
          //   type: 'danger',
          //   text1: 'Attention! Please drive carefully and stay alert.',
          //   text2: `You are entering high-risk accident zone caused by ${item?.properties.accident_cause}.`,
          // });
        });
      }
    }
  }, [currentCoordinate, nearestFeatures]);
  // ? checking user is in geofence

  // ? request location permission from user
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      //   console.log('granted', granted);
      if (granted === 'granted') {
        // console.log('You can use Geolocation');
        return true;
      } else {
        // console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  // ? request location permission from user

  // ? get CurrentPosision from button current Location
  const getCurrPosition = async () => {
    const resultPermission = await requestLocationPermission();
    if (resultPermission) {
      Geolocation.getCurrentPosition(
        position => {
          //   console.log(position);
          setCurrentPosition(position);
        },
        error => {
          console.log(error.code, error.message);
          setCurrentPosition({});
        },
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 10000},
      );
    }
  };
  // ? get CurrentPosision from button current Location

  // ? mapping current position to set current coordinate
  useEffect(() => {
    if (
      currentPosition?.coords?.longitude &&
      currentPosition?.coords?.latitude
    ) {
      setCurrentCoordinate([
        currentPosition.coords?.longitude,
        currentPosition.coords?.latitude,
      ]);
    }
  }, [currentPosition]);
  // ? mapping current position to set current coordinate

  // ? set Camera follow current coordinate
  useEffect(() => {
    camera.current?.setCamera({
      centerCoordinate: currentCoordinate,
    });
  }, [currentCoordinate]);
  // ? set Camera follow current coordinate

  // ? watch current location user every 500 ms
  useEffect(() => {
    const geolocationOptions = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 500,
    };

    const locationWatchId = Geolocation.watchPosition(
      position => {
        const {coords} = position;
        setCurrentCoordinate([coords?.longitude, coords?.latitude]);
      },
      error => {
        console.log('Error:', error);
      },
      geolocationOptions,
    );
    return () => {
      Geolocation.clearWatch(locationWatchId);
    };
  }, []);
  // ? watch current location user every 500 ms

  // ? function to add marker
  const addMarker = (datas: any) => {
    if (datas) {
      setMarkerUserDefined([
        ...markerUserDefined,
        {
          id: uuid.v4(),
          coordinates: datas?.geometry?.coordinates,
        },
      ]);
    }
  };
  const deleteMarker = (data: any) => {
    const indexToDelete = markerUserDefined.findIndex(
      marker => marker.id === data.properties?.id,
    );

    if (indexToDelete !== -1) {
      const updatedMarkers = [...markerUserDefined];
      updatedMarkers.splice(indexToDelete, 1);
      setMarkerUserDefined(updatedMarkers);
    }
  };
  // ? function to add marker
  return (
    <>
      <View style={styles.container}>
        <MapBoxGL.MapView
          style={{flex: 1}}
          styleURL="mapbox://styles/donihadimas/clohu5zb2002l01o41u9w78xw"
          zoomEnabled={true}
          rotateEnabled={true}
          logoEnabled={false}
          attributionEnabled={false}
          compassPosition={{bottom: 15, left: 8}}
          scaleBarEnabled={false}
          onDidFinishLoadingMap={() => {
            setMapReady(true);
          }}
          onLongPress={e => {
            addMarker(e);
          }}>
          <Camera
            ref={camera}
            zoomLevel={15}
            minZoomLevel={6}
            maxZoomLevel={20}
            pitch={30}
            animationDuration={1000}
            animationMode={'moveTo'}
          />
          {markerUserDefined.map((marker: any) => (
            <PointAnnotation
              id={marker.id?.toString()}
              key={marker.id}
              coordinate={marker.coordinates}
              title="Marker"
              onSelected={e => deleteMarker(e)}>
              <MaterialCommunityIcons
                name="google-maps"
                size={25}
                color="blue"
              />
            </PointAnnotation>
          ))}

          {mapReady &&
            nearestFeatures &&
            nearestFeatures?.map((feature: any, index: number) => (
              <CustomGeofence
                id={`customGeofenceId-${feature?.id}`}
                key={`customGeofenceKey-${feature?.id}`}
                feature={feature}
                visibility={visibleGeofences}
              />
            ))}
          {mapReady &&
            nearestFeatures &&
            nearestFeatures?.map((feature: any, index: number) => (
              <CustomMarker
                id={`customMarkerId-${feature?.id}`}
                key={`customMarkerKey-${feature?.id}`}
                feature={feature}
              />
            ))}

          <UserLocation
            ref={userLocationRef}
            animated={true}
            androidRenderMode="gps"
            renderMode={UserLocationRenderMode.Native}
            showsUserHeadingIndicator={true}
            visible={true}
            minDisplacement={1}
          />
        </MapBoxGL.MapView>

        <FAB
          icon="location-sharp"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: '13%',
            borderRadius: 50,
            backgroundColor: '#ffffff',
          }}
          onPress={() => getCurrPosition()}
          variant="surface"
          color="#4361ee"
          rippleColor={'rgba(67, 97, 238, 0.2)'}
          size="small"
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          position: 'absolute',
          top: 10,
        }}>
        <Text variant="bodySmall" style={{textAlign: 'center'}}>
          Longitude: {currentCoordinate[0]} - Latitude: {currentCoordinate[1]}
        </Text>
      </View>
    </>
  );
};

export default MapsBox;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

  cardInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: 0,
    padding: 15,
  },
  calloutContainer: {
    width: 250,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    marginBottom: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
