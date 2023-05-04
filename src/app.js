import React, {useState, useEffect} from 'react';
import AuthNavigator from './Navigations/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './Navigations/HomeNavigation';
import CultivationTipsScreen from './screens/CultivationTipsScreen';
import {useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import PlantDiseaseNavigation from './Navigations/PlantDiseaseNavigation';
import CustomSplashScreen from './screens/SplashScreen/SplashScreen';
import CreatePostScreen from './screens/create-post-screen';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

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
        {true ? (
          <>
            {/* <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home" component={HomeNavigator} />
              <Drawer.Screen
                name="PlantDiseaseNavigator"
                component={PlantDiseaseNavigation}
              />
              </Drawer.Navigator> */}

            <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
            <Stack.Screen
              name="PlantDiseaseNavigator"
              component={PlantDiseaseNavigation}
            />
            <Stack.Screen name="create-post" component={CreatePostScreen} />
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
