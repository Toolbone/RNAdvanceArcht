import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';

import { navigationRef } from './NavigationService';
import Tabs from 'app/containers/Tabs';
import Login from 'app/screens/login';

import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Loader from '../components/Loader';

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

function App() {
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  const stackProps = DeviceInfo.isTablet() ? { headerMode: 'none' } : {};
  let isLoading = useSelector((state) => state.rootReducer.isLoading);

  return (
    <NavigationContainer ref={navigationRef}>
      {/*<Loader modalVisible={isLoading} animationType="fade" />*/}
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
              headerLeft: null,
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
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
/*
<Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{
              headerLeft: null,
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
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
            }}
          />
        )}
      </Stack.Navigator>
 */
