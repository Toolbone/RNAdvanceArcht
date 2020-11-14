/**
 * React Native App
 * Everything starts from the entry point
 */
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Navigator from 'app/navigation';
import configureStore from 'app/store';
import Loader from './components/Loader';
const { persistStoreConfig, store } = configureStore();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#3498db',
    // accent: '#f1c40f',
  },
};

export default function EntryPoint() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator />}
        persistor={persistStoreConfig}>
        <PaperProvider theme={theme}>
          <Navigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
