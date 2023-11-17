/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Image} from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Image
          style={{width: 250, height: 250}}
          source={require('../../assets/images/icon.png')}
        />
      </View>
    </View>
  );
};

export default SplashScreen;
