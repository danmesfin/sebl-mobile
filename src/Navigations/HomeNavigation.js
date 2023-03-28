/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import CommunityScreen from '../screens/Community/CommunityScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../styles/theme';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Community') {
            iconName = 'users';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Color.primary,
        inactiveTintColor: Color.secondaryLight,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerTitle: 'Sebl'}}
      />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigator;
