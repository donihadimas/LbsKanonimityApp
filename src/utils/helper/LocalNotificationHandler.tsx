/* eslint-disable @typescript-eslint/no-unused-vars */
import PushNotification from 'react-native-push-notification';
import notifee, {
  AndroidCategory,
  AndroidImportance,
} from '@notifee/react-native';
import {Platform} from 'react-native';
PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },

  popInitialNotification: true,
  requestPermissions: true,
});
export const createChannels = ({channelId, channelName}: any) => {
  PushNotification.createChannel(
    {
      channelId: channelId,
      channelName: channelName,
      channelDescription: 'A channel to categorise your notifications',
      soundName: 'voiceoverid.mp3',
    },
    created => {
      console.log(`Channel created: ${created}`);
    },
  );
};
export const createChannelNotifee = ({
  channelId,
  channelName,
  sound = 'default',
}: any) => {
  notifee.createChannel({
    id: channelId,
    name: channelName,
    vibration: true,
    vibrationPattern: [300, 500],
  });
};

export const LocalNotification = ({id, channelId, data}: any) => {
  PushNotification.localNotification({
    id: id,
    channelId: channelId,
    autoCancel: true,
    bigText: `Anda memasuki zona kecelakaan yang disebabkan oleh ${data?.properties.accident_cause}.`,
    title: 'Perhatian!',
    message: 'Mohon berkendara dengan hati-hati dan tetap waspada.',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'voiceoverid.mp3',
    actions: ['Yes', 'No'],
  });
};

export const NotifeeLocalNotification = ({id, channelId, title, body}: any) => {
  notifee.displayNotification({
    id: id,
    title: title,
    body: body,
    android: {
      channelId,
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
      asForegroundService: true,
    },
  });
  return null;
};

export const FullscreenNotification = ({id}: any) => {
  notifee.displayNotification({
    id: id,
    body: 'Full-screen notification',
    android: {
      category: AndroidCategory.CALL,
      importance: AndroidImportance.HIGH,
      fullScreenAction: {
        id: 'default',
      },
      asForegroundService: true,
    },
  });
};

export const DisplayNotifeeNotification = async ({id, title, body}: any) => {
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  let channelId;
  try {
    channelId = await notifee.createChannel({
      id: 'default-8',
      name: 'Default Channel 8',
      vibration: true,
      vibrationPattern: [300, 500],
      importance: AndroidImportance.HIGH,
    });
  } catch (error) {
    console.log('Failed to create Channel');
  }

  await notifee.displayNotification({
    id: id,
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
      asForegroundService: true,
    },
  });
};
