import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import theme from './styles/theme';

//user mang
import {restoreUser} from './store/authSlice/actions';
// components
import AuthNavigator from './Navigations/AuthNavigation';
import {NavigationContainer} from '@react-navigation/native';
import CustomHeader from './components/Custom-header';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './Navigations/HomeNavigation';
import CultivationTipsScreen from './screens/CultivationTipsScreen';

import PlantDiseaseNavigation from './Navigations/PlantDiseaseNavigation';
import CustomSplashScreen from './screens/SplashScreen/SplashScreen';
import CreatePostScreen from './screens/create-post-screen';
import SelectCropScreen from './screens/CultivationTipsScreen/select-crop-screen';
import CultivationCategorySelectionScreen from './screens/CultivationTipsScreen/select-tip-category-screen';
import TipsViewScreen from './screens/CultivationTipsScreen/view-tip-screen';
import PostDetailScreen from './screens/view-post-screen';
import DiseaseControlScreen from './screens/view-disease-control-method';
import PredictionScreen from './screens/yield-prediction-screen';
import SelectDiseaseScreen from './screens/pest-control/select-disease-screen';
//import {setUser} from './redux/authSlice';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

const MainApp = () => {
  const [appReady, setAppReady] = useState(false);
  const {user} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if there is a user in the local storage
    AsyncStorage.getItem('user')
      // eslint-disable-next-line no-shadow
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
  }, [dispatch]);

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
            <Stack.Screen
              name="select-crop"
              component={SelectCropScreen}
              options={{
                headerShown: true,
                headerTitle: 'Select crop',
                headerStyle: {
                  backgroundColor: theme.primaryDark,
                },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="tip-in-detail-screen"
              component={CultivationCategorySelectionScreen}
              options={({navigation, route}) => ({
                headerShown: true,
                headerLeft: () => (
                  <CustomHeader
                    navigation={navigation}
                    imageSource={route.params.icon}
                  />
                ),
                headerTitle: route.params.cropType,
              })}
            />

            <Stack.Screen
              name="view-tip-screen"
              component={TipsViewScreen}
              options={{headerShown: true, headerTitle: ''}}
            />
            <Stack.Screen
              name="view-post"
              component={PostDetailScreen}
              options={{headerShown: true, headerTitle: ''}}
            />
            <Stack.Screen
              name="view-disease-control-methods"
              component={DiseaseControlScreen}
              options={{headerShown: true, headerTitle: ''}}
            />
            <Stack.Screen
              name="yield-prediction"
              component={PredictionScreen}
              options={{headerShown: true, headerTitle: ''}}
            />
            <Stack.Screen
              name="select-disease"
              component={SelectDiseaseScreen}
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
