import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import CounterScreen from './src/screens/counterScreen';
import SampleScreen from './src/screens/Sample/SampleScreen';

const App = () => {
  return (
    <Provider store={store}>
      <SampleScreen />
    </Provider>
  );
};

export default App;
