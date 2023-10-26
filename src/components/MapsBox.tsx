import {PermissionsAndroid, View, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapBoxGL, {PointAnnotation} from '@rnmapbox/maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Camera} from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import {FAB, IconButton, Searchbar} from 'react-native-paper';

MapBoxGL.setAccessToken(
  'pk.eyJ1IjoiZG9uaWhhZGltYXMiLCJhIjoiY2xvNnprNGt3MDByeTJsbzBhOHc5ejJmbSJ9.G45CMiNJIHNETbB-x_gXIw',
);
MapBoxGL.setTelemetryEnabled(false);
MapBoxGL.setWellKnownTileServer('Mapbox');

const MapsBox = () => {
  const camera = useRef<Camera>(null);
  const [currentPosition, setCurrentPosition] = useState<any>({});
  const [coordinate, setCoordinate] = useState([107.5965, -7.104]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);
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
    if (currentPosition) {
      setCoordinate([
        currentPosition.coords?.longitude,
        currentPosition.coords?.latitude,
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosition]);
  useEffect(() => {
    camera.current?.setCamera({
      // eslint-disable-next-line prettier/prettier
      centerCoordinate: coordinate,
    });
  }, [coordinate]);

  useEffect(() => {
    const geolocationOptions = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 1000,
    };

    const locationWatchId = Geolocation.watchPosition(
      position => {
        const {coords} = position;
        setCoordinate([coords?.longitude, coords?.latitude]);
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
  return (
    <View style={{flex: 1}}>
      <MapBoxGL.MapView
        style={{flex: 1}}
        styleURL="mapbox://styles/mapbox/streets-v12"
        zoomEnabled={true}
        rotateEnabled={true}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={true}
        compassPosition={{bottom: 8, left: 8}}
        scaleBarEnabled={false}>
        <Camera
          ref={camera}
          zoomLevel={15}
          animationDuration={1000}
          pitch={40}
          animationMode={'moveTo'}
        />
        <PointAnnotation
          id="marker"
          coordinate={[107.5965, -7.104]}
          title="Marker">
          <FontAwesome name="map-marker" size={30} color="#900" />
        </PointAnnotation>
      </MapBoxGL.MapView>
      <FAB
        icon="location-sharp"
        style={{position: 'absolute', margin: 16, right: 0, bottom: 0}}
        onPress={() => getCurrPosition()}
        variant="surface"
      />
      <View style={styles.cardInput}>
        <Searchbar
          theme={{colors: {primary: 'green'}}}
          placeholder="Where would you like to go?"
          onChangeText={onChangeSearch}
          value={searchQuery}
          elevation={5}
          style={{width: '80%'}}
        />
        <IconButton
          icon="paper-plane"
          size={25}
          mode="contained"
          onPress={() => console.log('Pressed')}
        />
      </View>
    </View>
  );
};

export default MapsBox;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
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
});
