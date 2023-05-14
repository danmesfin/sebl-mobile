import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
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
import SelectCropScreen from './screens/CultivationTipsScreen/select-crop-screen';
import CultivationCategorySelectionScreen from './screens/CultivationTipsScreen/select-tip-category-screen';
import TipsViewScreen from './screens/CultivationTipsScreen/view-tip-screen';

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
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        /> */}
        {user ? (
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
            <Stack.Screen name="select-crop" component={SelectCropScreen} />
            <Stack.Screen
              name="tip-in-detail-screen"
              component={CultivationCategorySelectionScreen}
            />
            <Stack.Screen name="view-tip-screen" component={TipsViewScreen} />
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
