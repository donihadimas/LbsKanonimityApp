/* eslint-disable @typescript-eslint/no-unused-vars */
import {View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import JSONTree from 'react-native-json-tree';
import dataUsers from '../../assets/data/dummyUser_500.json';
import ChartNotifyInsideGeofencing from '../../components/Chart/ChartNotifyInsideGeofencing';
import ChartCreateGeofence from '../../components/Chart/ChartCreateGeofence';
import ChartKAnonymityAnalysis from '../../components/Chart/ChartKAnonymityAnalysis';

const KAnonymityAnalysis = () => {
  const userDatas = useSelector((state: any) => state.userDatas.users?.[0]);
  const applicationSettings = useSelector(
    (state: any) => state.setting.application?.[0],
  );
  const perfMonitor = useSelector((state: any) => state.perfMonitor);
  return (
    <ScrollView style={{padding: 15}}>
      <Text variant="titleLarge" style={{marginBottom: 15}}>
        Analytics
      </Text>
      <View style={{gap: 15}}>
        <Text variant="titleMedium">Response Time Create Geofence</Text>
        <ChartCreateGeofence />
        <Text variant="titleMedium">
          Response Time Notification when User Inside Geofence
        </Text>
        <ChartNotifyInsideGeofencing />
        <View
          style={{
            paddingBottom:
              applicationSettings?.KAnonymityAnalisys === true ? 0 : 150,
          }}>
          <Text variant="titleMedium">Response Time K-Anonymity</Text>
          <ChartKAnonymityAnalysis />
        </View>
        {applicationSettings?.KAnonymityAnalisys === true && (
          <View style={{paddingBottom: 150}}>
            <Text variant="titleMedium">
              Data Before Implementing K-Anonymity
            </Text>
            <JSONTree data={dataUsers && dataUsers?.users} />
            <Text variant="titleMedium">
              Data After Implementing K-Anonymity
            </Text>
            <JSONTree data={userDatas && JSON.parse(userDatas)} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default KAnonymityAnalysis;
