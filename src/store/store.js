import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../store/slices/counterSlice';
import authSlice from '../redux/authSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
  },
});

export default store;
