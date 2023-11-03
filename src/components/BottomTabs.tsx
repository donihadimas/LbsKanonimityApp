/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import HomePage from '../pages/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SettingPage from '../pages/Setting';
import SummaryPage from '../pages/Analytics';
import Toast from 'react-native-toast-message';

const Tab = createBottomTabNavigator();

const EmergencyButton = ({children, onPress}: any) => (
  <TouchableOpacity
    style={{
      top: -40,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FF7575',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);
const BottomTabs = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
            borderRadius: 15,
            height: 70,
            ...styles.shadow,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}: any) => (
              <Icon
                source={focused ? 'home' : 'home-outline'}
                color={focused ? '#4361ee' : '#748c94'}
                size={20}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Emergency"
          component={SummaryPage}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, route}: any) => (
              <Icon
                source={'alert-circle'}
                color={focused ? '#ffffff' : '#ffffff'}
                size={40}
              />
            ),
            tabBarButton: (props: any) => (
              <EmergencyButton
                {...props}
                onPress={() => {
                  Toast.show({
                    type: 'danger',
                    text1: 'Emergency Button Pressed',
                    text2:
                      'Assistance request has been sent, help is arriving.',
                  });
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingPage}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}: any) => (
              <Icon
                source={focused ? 'settings' : 'settings-outline'}
                color={focused ? '#4361ee' : '#748c94'}
                size={20}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#00000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
