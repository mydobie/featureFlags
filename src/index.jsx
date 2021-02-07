/* eslint-disable react/jsx-filename-extension */
/* This tells the application to load into the html object with an id of "root"
NOTE: There normally isn't a reason to change this file
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import App from './App';
import './scss/index.scss';

const store = configureStore();

let RenderApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

if (process.env.REACT_APP_USE_LOCAL_STORAGE === 'true') {
  const persistor = persistStore(store);

  RenderApp = (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}

ReactDOM.render(RenderApp, document.getElementById('root'));
