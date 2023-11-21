/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import dataUsers from '../assets/data/dummyUser_500.json';
import {isWithinRange} from '../utils/helper/Algoritms';
import {Callout, PointAnnotation} from '@rnmapbox/maps';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UsersMarker = ({currentCoordinate}: any) => {
  const nearestUsers: any = dataUsers?.users?.filter((item: any) => {
    const coordinateB = [item.lokasi.longitude, item.lokasi.latitude];
    return isWithinRange({
      locationA: currentCoordinate,
      locationB: coordinateB,
      range: 1,
    });
  });
  return (
    <>
      {nearestUsers?.length > 0 &&
        nearestUsers.map((user: any, idx: number) => {
          let randomId = uuid.v4();
          const coordinatesUser = [user.lokasi.longitude, user.lokasi.latitude];
          return (
            <PointAnnotation
              id={randomId?.toString()}
              key={randomId?.toString()}
              coordinate={coordinatesUser}>
              <View>
                <MaterialCommunityIcons
                  name="account-circle"
                  size={30}
                  color="#2b7a91"
                />
              </View>
              <Callout title="Properties" style={styles.calloutContainer}>
                <View>
                  <Text>Name : {user?.nama}</Text>
                  <Text>Email : {user?.email}</Text>
                  <Text>Address : {user?.alamat?.detail}</Text>
                  <Text>Phone : {user?.nomor_handphone}</Text>
                  <Text>Birth Date : {user?.tanggal_lahir}</Text>
                </View>
              </Callout>
            </PointAnnotation>
          );
        })}
    </>
  );
};

export default UsersMarker;
const styles = StyleSheet.create({
  calloutContainer: {
    width: 300,
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
