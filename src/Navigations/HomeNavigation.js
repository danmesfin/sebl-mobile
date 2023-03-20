/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import CommunityScreen from '../screens/Community/CommunityScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {primaryColor, secondaryColor} from '../styles/theme';

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
        options={
          ({
            tabBarIcon: ({color}) => (
              <Icon name="home" type="font-awesome" color={color} />
            ),
          },
          {headerShown: false})
        }
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={
          ({
            tabBarIcon: ({color}) => (
              <Icon name="users" type="font-awesome" color={color} />
            ),
          },
          {headerShown: false})
        }
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={
          ({
            tabBarIcon: ({color}) => (
              <Icon name="user" type="font-awesome" color={color} />
            ),
          },
          {headerShown: false})
        }
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
