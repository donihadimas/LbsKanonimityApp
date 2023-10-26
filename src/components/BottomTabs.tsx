/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import HomePage from '../pages/Home';
import SummaryPage from '../pages/Analytics';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-paper';

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => <Icon source="home" color={'blue'} size={20} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SummaryPage}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <Icon source="google-analytics" color={'red'} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabs;
