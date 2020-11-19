import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';

import { navigationRef } from './NavigationService';
import Tabs from 'app/containers/Tabs';
import Login from 'app/screens/login';

import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Loader from '../components/Loader';
import * as loginActions from '../screens/login/redux/actions';
import * as store from '../screens/login/redux/reducers';

const Stack = createStackNavigator();

const homeOptions = {
  title: 'My home',
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export default function App() {
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  const stackProps = DeviceInfo.isTablet() ? { headerMode: 'none' } : {};
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginReducer.token);
  const onLogout = () => dispatch(loginActions.requestLogout(token));
  let isLoading = useSelector((state) => state.rootReducer.isLoading);

  return (
    <NavigationContainer ref={navigationRef}>
      <Loader modalVisible={isLoading} animationType="fade" />
      <Stack.Navigator
        {...stackProps}
        screenOptions={{
          headerStyle: {
            backgroundColor: '##fff',
            borderBottomWidth: StyleSheet.hairlineWidth,
          },
          headerTintColor: '#2c3e50',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}>
        {isLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{
              headerLeft: () => (
                <View style={{ flexDirection: 'row' }}>
                  <IconButton
                    icon="logout"
                    color="#bdc3c7"
                    size={20}
                    onPress={onLogout}
                  />
                </View>
              ),
              headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                  <IconButton
                    icon="settings"
                    color="#bdc3c7"
                    size={20}
                    onPress={() => {}}
                  />
                  <IconButton
                    icon="bell"
                    color="#bdc3c7"
                    size={20}
                    onPress={() => {}}
                  />
                </View>
              ),
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
