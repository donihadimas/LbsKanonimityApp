/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import BottomTabs from '../components/BottomTabs';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import SplashScreen from './Splash';
import StackNavigation from '../components/StackNavigation';
// import BottomTabsMaterial from '../components/BottomTabsMaterial';

const App = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
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
  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
  }, []);
  return (
    <>
      {showSplashScreen && <SplashScreen />}
      {!showSplashScreen && <StackNavigation />}
      {/* <BottomTabs />
      <Toast config={toastConfig} /> */}
      {/* <BottomTabsMaterial /> */}
    </>
  );
};

export default App;
