/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import dataUsers from '../assets/data/dummyUser_500.json';
import {
  isWithinRange,
  generalizeValue,
  generalizeData,
} from '../utils/helper/Algoritms';
import {Callout, PointAnnotation} from '@rnmapbox/maps';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setUserDatas} from '../utils/redux/userData/userDataReducers';
import {useDispatch} from 'react-redux';
interface GroupedData {
  address: string;
  users: any[];
}
const UsersMarker = ({currentCoordinate}: any) => {
  const [groupDataByPostCode, setGroupDataByPostCode] = useState<any>([]);
  console.log(
    'file: UsersMarker.tsx:13 ~ UsersMarker ~ groupDataByPostCode:',
    groupDataByPostCode,
  );
  const dispatcher = useDispatch();
  const groupedData = (data: any) => {
    const groupData = data.reduce((groups: {[key: string]: any}, user: any) => {
      const kodepos = user.alamat.kodepos;

      if (!groups[kodepos]) {
        groups[kodepos] = [];
      }

      groups[kodepos].push(user);
      return groups;
    }, {});
    const result: any = Object.keys(groupData).map(key => ({
      kodepos: key,
      data_users: groupData[key],
    }));
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await groupedData(dataUsers.users);
        setGroupDataByPostCode(result);
      } catch (error) {
        console.log('file: UsersMarker.tsx:114 ~ fetchData ~ error:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const generalizedData = generalizeData(groupDataByPostCode);
    dispatcher(setUserDatas(generalizedData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupDataByPostCode]);
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
