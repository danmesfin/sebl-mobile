import 'react-native-gesture-handler';
import React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ImagePickerScreen from '../screens/ImagePickerScreen/ImagePickerScreen';
import PlantDiseaseDetectionScreen from '../screens/PlantDiseaseDetectionScreen/PLantDiseaseDetectionScreen';

const Stack = createStackNavigator();

const PlantDiseaseNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Select Image"
      options={{headerShown: false}}>
      <Stack.Screen name="Select Image" component={ImagePickerScreen} />
      <Stack.Screen
        name="Plant Disease Detection"
        component={PlantDiseaseDetectionScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PlantDiseaseNavigation;
