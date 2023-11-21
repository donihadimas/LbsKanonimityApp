/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import BottomTabs from '../components/BottomTabs';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import SplashScreen from './Splash';
import StackNavigation from '../components/StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_SETTINGS_KEY, USER_DATA_KEY} from '../utils/helper/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAccountSetting,
  setApplicationSetting,
} from '../utils/redux/setting/settingReducer';
// import BottomTabsMaterial from '../components/BottomTabsMaterial';

const App = () => {
  const applicationSettings = useSelector(
    (state: any) => state.setting.application,
  );
  const account = useSelector((state: any) => state.setting.account);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [userData, setUserData] = useState<any>({});
  const dispatcher = useDispatch();
  const toastConfig = {
    danger: (props: any) => (
      <BaseToast
        {...props}
        style={{borderLeftColor: '#FF7575'}}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 14,
          fontWeight: '400',
        }}
      />
    ),
  };
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('file: index.tsx:24 ~ getUserData ~ error:', error);
    }
  };
  const getAppSettings = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(APP_SETTINGS_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('file: index.tsx:24 ~ getUserData ~ error:', error);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setUserData(account?.[0]);
  }, [account]);

  const initiateAsyncStorageAppSetting = async () => {
    const existingValue = await AsyncStorage.getItem(APP_SETTINGS_KEY);
    if (existingValue === null) {
      const defaultValue = {
        geofenceOn: false,
        notificationOn: false,
        KAnonymityAnalisys: false,
        KAnonymityValue: '3',
      };
      const jsonValue = JSON.stringify(defaultValue);
      await AsyncStorage.setItem(APP_SETTINGS_KEY, jsonValue);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      initiateAsyncStorageAppSetting();
      const userDatas = await getUserData();
      if (userDatas && account?.length === 0) {
        dispatcher(setAccountSetting(userDatas));
      }
      const appSettings = await getAppSettings();
      if (appSettings && applicationSettings?.length === 0) {
        dispatcher(setApplicationSetting(appSettings));
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {showSplashScreen && <SplashScreen />}
      {(!userData || userData?.loggedIn === false) && !showSplashScreen && (
        <StackNavigation />
      )}
      {!showSplashScreen && userData?.loggedIn === true && <BottomTabs />}
      <Toast config={toastConfig} />
      {/* <BottomTabs />
      <Toast config={toastConfig} /> */}
      {/* <BottomTabsMaterial /> */}
    </>
  );
};

export default App;
