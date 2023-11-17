/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';

const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
