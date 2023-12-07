/* eslint-disable @typescript-eslint/no-unused-vars */
import {View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import {useSelector} from 'react-redux';
import JSONTree from 'react-native-json-tree';
import dataUsers from '../../assets/data/dummyUser_500.json';
import ChartNotifyInsideGeofencing from '../../components/Chart/ChartNotifyInsideGeofencing';

const KAnonymityAnalysis = () => {
  const userDatas = useSelector((state: any) => state.userDatas.users?.[0]);
  const applicationSettings = useSelector(
    (state: any) => state.setting.application?.[0],
  );
  return (
    <ScrollView style={{padding: 15}}>
      <Text variant="titleLarge" style={{marginBottom: 15}}>
        Analytics
      </Text>
      <View style={{gap: 15}}>
        <Text variant="titleMedium">ChartNotifyInsideGeofencing</Text>
        <ChartNotifyInsideGeofencing />
        <Text variant="titleMedium">Executed Time</Text>
        {applicationSettings?.KAnonymityAnalisys === true && (
          <>
            <Text variant="titleMedium">
              Data Before Implementing K-Anonymity
            </Text>
            <JSONTree data={dataUsers && dataUsers?.users} />
            <Text variant="titleMedium">
              Data After Implementing K-Anonymity
            </Text>
            <JSONTree data={userDatas && JSON.parse(userDatas)} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default KAnonymityAnalysis;
