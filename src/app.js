import React from 'react';
import AuthNavigator from './Navigations/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './Navigations/HomeNavigation';
import {useSelector} from 'react-redux';
import PlantDiseaseNavigation from './Navigations/PlantDiseaseNavigation';

const Stack = createStackNavigator();

const MainApp = () => {
  const {user} = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
            <Stack.Screen
              name="PlantDiseaseNavigator"
              component={PlantDiseaseNavigation}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
