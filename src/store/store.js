import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../store/slices/counterSlice';
import authReducer from '../redux/authSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export default store;
