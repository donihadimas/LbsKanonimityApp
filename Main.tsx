import React from 'react';
import {PaperProvider, MD3LightTheme, useTheme} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import App from './src/pages/App';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {QueryClientProvider, QueryClient} from 'react-query';

const theme = {
  ...MD3LightTheme,
};
export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();
const Main = () => {
  const queryClient = new QueryClient();
  return (
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
  );
};

export default Main;

// const styles = StyleSheet.create({});
