/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import HomePage from '../pages/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon, IconButton} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SettingPage from '../pages/Setting';
import {Portal, Modal, Text} from 'react-native-paper';
import KAnonymityAnalysis from '../pages/K_Anonymity_Analysis';

const Tab = createBottomTabNavigator();

const SummaryButton = ({children, onPress}: any) => (
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
        backgroundColor: '#2b7a91',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);
const BottomTabs = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalKAnonymity, setOpenModalKAnonymity] = useState(false);

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
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
          name="Analytics"
          component={KAnonymityAnalysis}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}: any) => (
              <Icon
                source={focused ? 'analytics' : 'analytics-outline'}
                color={focused ? '#2b7a91' : '#748c94'}
                size={20}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, route}: any) => (
              <Icon
                source={'home'}
                color={focused ? '#ffffff' : '#ffffff'}
                size={40}
              />
            ),
            tabBarButton: (props: any) => <SummaryButton {...props} />,
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
                color={focused ? '#2b7a91' : '#748c94'}
                size={20}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <Portal>
        <Modal
          visible={openModal}
          onDismiss={() => {
            setOpenModal(false);
          }}
          style={{margin: 15}}
          contentContainerStyle={{backgroundColor: '#fff', padding: 15}}>
          <Text variant="titleMedium" style={{marginBottom: 15}}>
            Application Analysis
          </Text>
          <View style={{gap: 15}}>
            <Text>Executed Time : 110ms</Text>
            <Text>Performance Appication : 8</Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              <Text>K Anonimity Analisys :</Text>
              <IconButton
                icon="eye"
                mode="outlined"
                containerColor="#2b7a91"
                iconColor={'#fff'}
                size={20}
                onPress={() => {
                  setOpenModalKAnonymity(true);
                }}
              />
            </View>
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={openModalKAnonymity}
          onDismiss={() => {
            setOpenModalKAnonymity(false);
          }}
          style={{margin: 15}}
          contentContainerStyle={{backgroundColor: '#fff', padding: 15}}>
          <Text variant="titleMedium" style={{marginBottom: 15}}>
            K Anonymity Analysis
          </Text>
        </Modal>
      </Portal>
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
