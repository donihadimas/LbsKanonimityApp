/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Main from './Main';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';

notifee.registerForegroundService(notification => {
  return new Promise(() => {
    notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'stop') {
        notifee.stopForegroundService();
      }
    });
  });
});
AppRegistry.registerComponent(appName, () => Main);
