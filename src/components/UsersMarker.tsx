/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import dataUsers from '../assets/data/dummyUser_500.json';
import {
  isWithinRange,
  generalizeData,
  validateKAnonymity,
} from '../utils/helper/Algoritms';
import {Callout, PointAnnotation} from '@rnmapbox/maps';
import uuid from 'react-native-uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setUserDatas} from '../utils/redux/userData/userDataReducers';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/id';
import now from 'performance-now';
import {
  setRTimeImplementingKAnonymity,
  updateRTimeImplementingKAnonymity,
} from '../utils/redux/performanceMonitor/performanceMonitorReducers';
interface GroupedData {
  address: string;
  users: any[];
}
const UsersMarker = ({currentCoordinate}: any) => {
  const [groupDataByPostCode, setGroupDataByPostCode] = useState<any>([]);
  const [nearestUsers, setNearestUsers] = useState<any>([]);
  const userDatas = useSelector((state: any) => state.userDatas.users?.[0]);
  const applicationSettings = useSelector(
    (state: any) => state.setting.application?.[0],
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
    if (applicationSettings.KAnonymityAnalisys === true) {
      const generalizedData = generalizeData(groupDataByPostCode);
      const validatedData = validateKAnonymity(
        generalizedData,
        applicationSettings.KAnonymityValue,
      );
      dispatcher(setUserDatas(JSON.stringify(validatedData)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupDataByPostCode, userDatas, applicationSettings.KAnonymityAnalisys]);
  useEffect(() => {
    if (applicationSettings.KAnonymityAnalisys === true) {
      const startTime = now();
      const data: any = userDatas && JSON.parse(userDatas);
      if (data) {
        let arrNearUser: any = data
          .map((element: any) => {
            const filteredUsers = element.data_users.filter((user: any) => {
              const coordinateB = [user.lokasi.longitude, user.lokasi.latitude];
              return isWithinRange({
                locationA: currentCoordinate,
                locationB: coordinateB,
                range: 1,
              });
            });

            return filteredUsers.length > 0 ? [...filteredUsers] : null;
          })
          .filter(Boolean)
          .reduce(
            (accumulator: any, nearUser: any) => [...accumulator, ...nearUser],
            [],
          );
        setNearestUsers(arrNearUser);
      }
      const endTime = now();
      const responseTime = (endTime - startTime)?.toFixed(3);
      dispatcher(updateRTimeImplementingKAnonymity(responseTime));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    groupDataByPostCode,
    userDatas,
    currentCoordinate,
    applicationSettings.KAnonymityAnalisys,
  ]);
  useEffect(() => {
    if (applicationSettings?.KAnonymityAnalisys === false) {
      const startTime = now();
      const nearUsers: any = dataUsers?.users?.filter((item: any) => {
        const coordinateB = [item.lokasi.longitude, item.lokasi.latitude];
        return isWithinRange({
          locationA: currentCoordinate,
          locationB: coordinateB,
          range: 1,
        });
      });
      setNearestUsers(nearUsers);
      const endTime = now();
      const responseTime = (endTime - startTime)?.toFixed(3);
      dispatcher(updateRTimeImplementingKAnonymity(responseTime));
    }
  }, [dataUsers, currentCoordinate, applicationSettings]);
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
                  <Text style={{color: '#000'}}>Nama : {user?.nama}</Text>
                  <Text style={{color: '#000'}}>Email : {user?.email}</Text>
                  <Text style={{color: '#000'}}>
                    Alamat : {user?.alamat?.detail}
                  </Text>
                  <Text style={{color: '#000'}}>
                    No Hp : {user?.nomor_handphone}
                  </Text>
                  <Text style={{color: '#000'}}>
                    Tanggal Lahir :
                    {user?.tanggal_lahir.length === 10
                      ? moment(user?.tanggal_lahir)
                          .locale('id')
                          .format('DD MMMM YYYY')
                      : moment(user?.tanggal_lahir)
                          .locale('id')
                          .format('MMMM YYYY')}
                  </Text>
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
