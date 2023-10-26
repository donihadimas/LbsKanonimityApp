import {View, StyleSheet, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {FAB, IconButton, Searchbar} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';

const Maps = () => {
  const [currentPosition, setCurrentPosition] = useState<any>({
    coords: {
      accuracy: 0,
      altitude: 0,
      heading: 0,
      latitude: 0,
      longitude: 0,
      speed: 0,
    },
    extras: {
      maxCn0: 0,
      meanCn0: 0,
      satellites: 0,
    },
    mocked: false,
    timestamp: 0,
  });
  const [region, setRegion] = useState({
    latitude: -7.104111,
    longitude: 107.5965,
    latitudeDelta: 0.0005,
    longitudeDelta: 0.0005,
  });
  const mapRef = useRef<MapView | null>(null);
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
      setRegion({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosition]);

  useEffect(() => {
    if (region) {
      mapRef?.current?.animateToRegion(region, 2000);
    }
  }, [region]);

  useEffect(() => {
    const geolocationOptions = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 1000,
    };

    const locationWatchId = Geolocation.watchPosition(
      position => {
        const {coords} = position;
        setRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
        });
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
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.map} initialRegion={region}>
        <Marker coordinate={region} />
      </MapView>
      <FAB
        icon="location-sharp"
        style={styles.fab}
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

export default Maps;

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
