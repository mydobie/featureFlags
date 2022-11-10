/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createRoot } from 'react-dom/client';
// import { persistStore } from 'redux-persist';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
//import configureStore from './redux/store';

import FeatureFlagContext from './components/FeatureFlagContext';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <FeatureFlagContext flags={[{ id: 'hello' }]}>
      <App />
    </FeatureFlagContext>
  </React.StrictMode>
);
