import React from 'react';
import {useState} from 'react';
import {BottomNavigation, Icon} from 'react-native-paper';
import HomePage from '../pages/Home';
import AnalyticsPage from '../pages/Analytics';
import SettingPage from '../pages/Setting';

const BottomTabsMaterial = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home',
      unfocusedIcon: 'home-outline',
    },
    {
      key: 'analytics',
      title: 'Analytics',
      focusedIcon: 'analytics',
      unfocusedIcon: 'analytics-outline',
    },
    {
      key: 'setting',
      title: 'Settings',
      focusedIcon: 'settings',
      unfocusedIcon: 'settings-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomePage,
    analytics: AnalyticsPage,
    setting: SettingPage,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
      activeColor="blue"
      sceneAnimationEnabled={true}
      sceneAnimationType="shifting"
      renderIcon={({route, focused, color}) => (
        <Icon
          source={focused ? route.focusedIcon : route.unfocusedIcon}
          size={24}
          color={color}
        />
      )}
    />
  );
};

export default BottomTabsMaterial;
