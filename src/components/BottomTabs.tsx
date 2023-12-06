/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import HomePage from '../pages/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, Icon, IconButton} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SettingPage from '../pages/Setting';
import SummaryPage from '../pages/Analytics';
import {Portal, Modal, Text} from 'react-native-paper';
import {
  DisplayNotifeeNotification,
  LocalNotification,
  NotifeeLocalNotification,
} from '../utils/helper/LocalNotificationHandler';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

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
  const userDatas = useSelector((state: any) => state.userDatas.users?.[0]);
  const navigation: any = useNavigation();
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
                color={focused ? '#2b7a91' : '#748c94'}
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
                source={'analytics'}
                color={focused ? '#ffffff' : '#ffffff'}
                size={40}
              />
            ),
            tabBarButton: (props: any) => (
              <SummaryButton
                {...props}
                onPress={() => {
                  setOpenModal(true);
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
                  // navigation.navigate('KAnonymityAnalysis');
                }}
              />
            </View>
          </View>
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
