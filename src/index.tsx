/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { persistStore } from 'redux-persist';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store } from './redux/store';

const usePersister = process.env.REACT_APP_USE_LOCAL_STORAGE === 'true';

const persistor = usePersister ? persistStore(store) : undefined;

const PeristorApp = usePersister ? (
  // @ts-ignore - this is a known issue
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
) : (
  <App />
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>{PeristorApp}</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
