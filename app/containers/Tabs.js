import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useSafeArea } from 'react-native-safe-area-context';
import { Portal, FAB } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';

import Setting from 'app/screens/Setting';
import About from 'app/screens/About';
import Profile from 'app/screens/Profile';

import TabBar from 'app/containers/tab-bar';

const isTablet = DeviceInfo.isTablet();
const Tab = isTablet
  ? createMaterialTopTabNavigator()
  : createMaterialBottomTabNavigator();

function Tabs() {
  const isFocused = useIsFocused();
  const safeArea = useSafeArea();
  let tabBarProps = {};

  if (isTablet) {
    tabBarProps = {
      tabBar: props => <TabBar {...props} />,
    };
  }

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
          name="Setting"
          component={Setting}
          options={{
            tabBarIcon: 'calendar-clock',
          }}
        />

        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: 'account-multiple',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: 'layers',
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused} // show FAB only when this screen is focused
          icon="plus-box"
          label={isTablet ? 'Create new' : null}
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
