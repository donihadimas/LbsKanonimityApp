/* eslint-disable @typescript-eslint/no-unused-vars */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, Text, Switch} from 'react-native-paper';
import {APP_SETTINGS_KEY} from '../../utils/helper/Constant';
import {TextInput, Button} from 'react-native-paper';
import {Image} from 'react-native';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {setApplicationSetting} from '../../utils/redux/setting/settingReducer';

const SettingPage = ({navigation}: any) => {
  const [userData, setUserData] = useState<any>({});
  const [appSetting, setAppSetting] = useState<any>({});
  const applicationSettings = useSelector(
    (state: any) => state.setting.application,
  );
  const account = useSelector((state: any) => state.setting.account);
  const dispatcher = useDispatch();
  const onToggleAppSettings = (getter: any) => {
    setAppSetting((prev: any) => ({
      ...prev,
      [getter]: !prev[getter],
    }));
  };
  useEffect(() => {
    setAppSetting(applicationSettings?.[0]);
    setUserData(account?.[0]);
  }, [applicationSettings, account]);
  const handleSaveSettings = async () => {
    try {
      const jsonValue = JSON.stringify(appSetting);
      await AsyncStorage.setItem(APP_SETTINGS_KEY, jsonValue);
      dispatcher(setApplicationSetting(appSetting));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Settings Successfully Saved',
      });
    } catch (error) {
      console.log('file: index.tsx:24 ~ handleSignUp ~ error:', error);
    }
  };
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
                value={appSetting?.geofenceOn}
                onValueChange={() => {
                  onToggleAppSettings('geofenceOn');
                }}
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
                value={appSetting?.notificationOn}
                onValueChange={() => {
                  onToggleAppSettings('notificationOn');
                }}
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
                value={appSetting?.KAnonymityAnalisys}
                onValueChange={() => {
                  onToggleAppSettings('KAnonymityAnalisys');
                }}
                color="#2b7a91"
              />
            </View>
            <View style={{gap: 15}}>
              <TextInput
                mode="outlined"
                label="K-Anonimity Value"
                value={appSetting?.KAnonymityValue}
                onChangeText={e =>
                  setAppSetting((prev: any) => ({
                    ...prev,
                    KAnonymityValue: e,
                  }))
                }
                selectionColor="#2b7a91"
                activeOutlineColor="#2b7a91"
              />
              <Button
                icon="save"
                mode="contained"
                buttonColor="#2b7a91"
                onPress={() => handleSaveSettings()}>
                Save Settings
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default SettingPage;
