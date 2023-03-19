/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {Icon} from 'react-native-elements';
import {primaryColor, secondaryColor} from '../styles/colors';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: primaryColor,
        inactiveTintColor: secondaryColor,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="home" type="font-awesome" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="users" type="font-awesome" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="user" type="font-awesome" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
