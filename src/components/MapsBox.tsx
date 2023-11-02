/* eslint-disable @typescript-eslint/no-unused-vars */
import {PermissionsAndroid, View, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapBoxGL, {
  Callout,
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
import {calculateDistance, isWithinRange} from '../utils/helper/Algoritms';

const ACCESSTOKEN =
  'pk.eyJ1IjoiZG9uaWhhZGltYXMiLCJhIjoiY2xvNnprNGt3MDByeTJsbzBhOHc5ejJmbSJ9.G45CMiNJIHNETbB-x_gXIw';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [nearestFeatures, setNearestFeatures] = useState<any>([]);

  const [markerUserDefined, setMarkerUserDefined] = useState<
    MarkerUserDefined[]
  >([]);
  const [mapReady, setMapReady] = useState(false);

  const {data: dataFeatureByDatasetId, refetch: refetchFeatureByDatasetId} =
    useGetAllFeatureByDatasetId('clogeca6r1cti2amuoxbguf6h');

  useEffect(() => {
    if (dataFeatureByDatasetId) {
      const nearestFeature: any = dataFeatureByDatasetId?.features?.filter(
        (item: any) => {
          return isWithinRange({
            locationA: currentCoordinate,
            locationB: item.geometry.coordinates,
            range: 1,
          });
        },
      );
      if (nearestFeature) {
        setNearestFeatures(nearestFeature);
      }
    }
  }, [dataFeatureByDatasetId, currentCoordinate]);

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
  useEffect(() => {
    camera.current?.setCamera({
      centerCoordinate: currentCoordinate,
    });
  }, [currentCoordinate]);
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
          zoomEnabled={true}
          rotateEnabled={true}
          logoEnabled={false}
          attributionEnabled={false}
          compassEnabled={true}
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
            maxZoomLevel={15}
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
            nearestFeatures?.map((feature: any) => (
              <CustomMarker feature={feature} key={feature?.id} />
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
          style={{position: 'absolute', margin: 16, right: 0, bottom: 0}}
          onPress={() => getCurrPosition()}
          variant="surface"
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
