import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';

import MainApp from './src/app';

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
