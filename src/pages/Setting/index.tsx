/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, Text, Switch} from 'react-native-paper';
import {USER_DATA_KEY} from '../../utils/helper/Constant';
import {Avatar} from 'react-native-paper';
import {Image} from 'react-native';
import moment from 'moment';

const SettingPage = ({navigation}: any) => {
  const [userData, setUserData] = useState<any>({});
  const [geofenceOn, setGeofenceOn] = useState(false);
  console.log('file: index.tsx:15 ~ SettingPage ~ geofenceOn:', geofenceOn);

  const onToggleGeofence = () => setGeofenceOn(!geofenceOn);
  console.log('file: index.tsx:11 ~ SettingPage ~ userData:', userData);
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('file: index.tsx:24 ~ getUserData ~ error:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const userDatas = await getUserData();
      setUserData(userDatas);
    };

    fetchData();
  }, []);
  return (
    <ScrollView style={{padding: 15}}>
      <Text variant="titleLarge" style={{marginBottom: 15}}>
        Settings
      </Text>
      <View style={{gap: 15}}>
        <Card
          mode="contained"
          style={{backgroundColor: '#fff', paddingVertical: 15}}>
          <Card.Title title="Account" />
          <Card.Content>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/icon.png')}
                style={{width: 100, height: 100, borderRadius: 50}}
              />
              <Text variant="titleLarge">{userData?.name}</Text>
              <Text variant="titleSmall">{userData?.phoneNumber}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  gap: 15,
                }}>
                <Text variant="titleSmall">{userData?.email}</Text>
                <Text variant="titleSmall">
                  {moment(userData?.birthDate).format('DD MMMM YYYY')}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Card
          mode="contained"
          style={{backgroundColor: '#fff', paddingVertical: 15}}>
          <Card.Title title="Application" />
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 15,
              }}>
              <Text variant="titleSmall">Geofence</Text>
              <Switch
                value={geofenceOn}
                onValueChange={onToggleGeofence}
                color="#2b7a91"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 15,
              }}>
              <Text variant="titleSmall">Notification</Text>
              <Switch
                value={geofenceOn}
                onValueChange={onToggleGeofence}
                color="#2b7a91"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 15,
              }}>
              <Text variant="titleSmall">K Anonimity Analysis</Text>
              <Switch
                value={geofenceOn}
                onValueChange={onToggleGeofence}
                color="#2b7a91"
              />
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default SettingPage;
