/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {PaperProvider, MD3LightTheme, useTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import App from './src/pages/App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {QueryClientProvider, QueryClient} from 'react-query';
import RemoteNotificationHandler from './src/utils/helper/RemoteNotificationHandler';
import {
  createChannelNotifee,
  createChannels,
} from './src/utils/helper/LocalNotificationHandler';
import notifee, {EventType} from '@notifee/react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/utils/redux/store';
const theme = {
  ...MD3LightTheme,
};
export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
const Main = () => {
  const queryClient = new QueryClient();
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = RemoteNotificationHandler();
  // ? listen notifications
  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    createChannels({
      channelId: 'warning-channel8',
      channelName: 'Warning Channel8',
    });
    // createChannelNotifee({
    //   channelId: 'channel-notifee2',
    //   channelName: 'Channel Notifee',
    // });
  }, []);
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('Notification dismissed by user', detail.notification);
          break;
        case EventType.PRESS:
          console.log('Notification clicked by user', detail.notification);
          break;
      }
    });
  }, []);
  // ? listen notifications
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <PaperProvider
            theme={theme}
            settings={{
              // eslint-disable-next-line react/no-unstable-nested-components
              icon: props => <Ionicons {...props} />,
            }}>
            <App />
          </PaperProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default Main;

// const styles = StyleSheet.create({});
