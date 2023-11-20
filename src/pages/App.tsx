/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import BottomTabs from '../components/BottomTabs';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import SplashScreen from './Splash';
import StackNavigation from '../components/StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DATA_KEY} from '../utils/helper/Constant';
// import BottomTabsMaterial from '../components/BottomTabsMaterial';

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [userData, setUserData] = useState<any>({});
  console.log('file: App.tsx:15 ~ App ~ userData:', userData);
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
  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const userDatas = await getUserData();
      setUserData(userDatas);
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
