import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../store/slices/counterSlice';
import authSlice from './authSlice';
import detectDiseaseSlice from '../redux/PlantDiseaseDetectionSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    detectDisease: detectDiseaseSlice,
  },
});

export default store;
