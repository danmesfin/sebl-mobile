import React, {useState, useEffect} from 'react';
import AuthNavigator from './Navigations/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './Navigations/HomeNavigation';
import CultivationTipsScreen from './screens/CultivationTipsScreen';
import {useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import PlantDiseaseNavigation from './Navigations/PlantDiseaseNavigation';
import CustomSplashScreen from './screens/SplashScreen/SplashScreen';

const Stack = createStackNavigator();

const MainApp = () => {
  const [appReady, setAppReady] = useState(false);
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
      setAppReady(true);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!appReady) {
    // Render the splash screen while the app is loading
    return <CustomSplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        /> */}
        {user ? (
          <>
            <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
            <Stack.Screen
              name="PlantDiseaseNavigator"
              component={PlantDiseaseNavigation}
            />
            <Stack.Screen
              name="Cultivation Tips"
              component={CultivationTipsScreen}
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
