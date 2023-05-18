import React, {useState, useEffect} from 'react';
import {firebase} from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

//user mang
import {restoreUser, signOutUser} from './redux/authSlice/actions';

// components
import AuthNavigator from './Navigations/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './Navigations/HomeNavigation';
import CultivationTipsScreen from './screens/CultivationTipsScreen';

import SplashScreen from 'react-native-splash-screen';

import PlantDiseaseNavigation from './Navigations/PlantDiseaseNavigation';
import CustomSplashScreen from './screens/SplashScreen/SplashScreen';
import CreatePostScreen from './screens/create-post-screen';
import SelectCropScreen from './screens/CultivationTipsScreen/select-crop-screen';
import CultivationCategorySelectionScreen from './screens/CultivationTipsScreen/select-tip-category-screen';
import TipsViewScreen from './screens/CultivationTipsScreen/view-tip-screen';
import PostDetailScreen from './screens/view-post-screen';

//import {setUser} from './redux/authSlice';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

const MainApp = () => {
  // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);

  const [appReady, setAppReady] = useState(false);
  const {user} = useSelector(state => state.auth);
  //const dispatch = useDispatch();
  // if (firebase.auth().currentUser) {
  //   const currentUser = firebase.auth().currentUser;
  //   console.log('Signed in username' + currentUser.displayName);
  // } else {
  //   console.log('no user signed in');
  // }
  // firebase.auth().onAuthStateChanged(user => {
  //   if (user) {
  //     console.log('user is logged', user.uid);
  //     dispatch(setUser(user));
  //   } else {
  //     console.log('user is not logged');
  //   }
  // });

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if there is a user in the local storage
    AsyncStorage.getItem('user')
      .then(user => {
        if (user) {
          dispatch(restoreUser(JSON.parse(user)));
        }
        setAppReady(true);
      })
      .catch(error => {
        console.log('Error retrieving user from local storage:', error);
        setAppReady(true);
      });
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
            <Stack.Screen
              name="view-tip-screen"
              component={TipsViewScreen}
              options={{headerShown: true, headerTitle: ''}}
            />
            <Stack.Screen
              name="view-post-in-detail"
              component={PostDetailScreen}
              options={{headerShown: true, headerTitle: ''}}
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
