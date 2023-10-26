import React from 'react';
import {PaperProvider, MD3LightTheme, useTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import App from './src/pages/App';
import Ionicons from 'react-native-vector-icons/Ionicons';

const theme = {
  ...MD3LightTheme,
};
export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
const Main = () => {
  return (
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
  );
};

export default Main;

// const styles = StyleSheet.create({});
