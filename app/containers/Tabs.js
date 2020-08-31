import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useSafeArea } from 'react-native-safe-area-context';
import { Portal, FAB } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';

import TabBar from 'app/containers/tab-bar';
import Setting from '../screens/setting';
import About from '../screens/about';
import Profile from '../screens/profile';
import Home from '../screens/home';
const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  const isFocused = useIsFocused();
  const safeArea = useSafeArea();
  let tabBarProps = {};

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Feed"
        shifting={true}
        labeled={false}
        sceneAnimationEnabled={false}
        activeColor="#00aea2"
        inactiveColor="#95a5a6"
        barStyle={{ backgroundColor: '#ffff' }}
        {...tabBarProps}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: 'home',
          }}
        />

        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarIcon: 'settings',
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: 'information-variant',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: 'account-multiple',
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused} // show FAB only when this screen is focused
          icon="plus-box"
          label={'Create new'}
          style={[
            styles.fab,
            {
              bottom: safeArea.bottom + 65,
            },
          ]}
        />
      </Portal>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
  },
});

export default Tabs;
