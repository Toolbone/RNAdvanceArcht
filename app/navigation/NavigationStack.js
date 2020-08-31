import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';
import Tabs from 'app/containers/Tabs';
import Login from 'app/screens/login';
import Home from 'app/screens/home';

import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';

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
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);

  return (
    <NavigationContainer ref={navigationRef}>
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
    </NavigationContainer>
  );
}

export default App;
