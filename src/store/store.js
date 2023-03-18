import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './reducers/counter';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
