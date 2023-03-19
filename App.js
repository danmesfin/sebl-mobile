import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import AuthNavigator from './src/Navigations/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './src/Navigations/HomeNavigation';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const App = () => {
  const {user} = useSelector(state => state.auth);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {user ? (
            <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
          ) : (
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
