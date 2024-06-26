/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';
import BottomTabs from './BottomTabs';
import KAnonymityAnalysis from '../pages/K_Anonymity_Analysis';

const StackNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
      <Stack.Screen
        name="K_Anonymity_Analysis"
        component={KAnonymityAnalysis}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
