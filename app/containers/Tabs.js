import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useSafeArea } from 'react-native-safe-area-context';
import { Portal, FAB, Text } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';

import TabBar from 'app/containers/TabBar';
import Setting from '../screens/Setting';
import About from '../screens/About';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  const navigation = useNavigation();
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
            tabBarIcon: 'image',
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: 'gift',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: 'account',
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused} // show FAB only when this screen is focused
          icon="cart"
          small={true}
          label={'Cart'}
          onPress={() => {
            navigation.navigate('Cart');
          }}
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
  label: {
    color: '#ffffff',
  },
});

export default Tabs;
