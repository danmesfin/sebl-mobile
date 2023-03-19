import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import CounterScreen from './src/screens/counterScreen';
import SampleScreen from './src/screens/Sample/SampleScreen';
import LoginScreen from './src/screens/Auth/signIn/SignInScreen';

const App = () => {
  return (
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  );
};

export default App;
