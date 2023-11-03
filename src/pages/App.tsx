/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import BottomTabs from '../components/BottomTabs';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
// import BottomTabsMaterial from '../components/BottomTabsMaterial';

const App = () => {
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
  return (
    <>
      <BottomTabs />
      <Toast config={toastConfig} />
      {/* <BottomTabsMaterial /> */}
    </>
  );
};

export default App;
