/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
// Contains routing and any application wide items like headers, footers and navigation

import { useDispatch } from 'react-redux';

import React, { ReactElement, useReducer } from 'react';
import { HashRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { loadFeatureFlags, loadFeatureFlagsRedux } from './components';

import {
  featureFlagsLocalStorage,
  featureFlagsRedux,
} from './FeatureFlagsConfig';

loadFeatureFlags({
  features: featureFlagsLocalStorage,
  overrides: JSON.parse(process.env.REACT_APP_FEATURE_FLAGS ?? '[]'),
  persist: process.env.REACT_APP_USE_LOCAL_STORAGE === 'true',
});

const App = (): ReactElement => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useDispatch()(
    loadFeatureFlagsRedux({
      features: featureFlagsRedux || [],
      overrides: JSON.parse(process.env.REACT_APP_FEATURE_FLAGS ?? '[]'),
      persist: process.env.REACT_APP_USE_LOCAL_STORAGE === 'true',
    })
  );
  const basename = '';
  return (
    <div>
      <Router basename={basename}>
        <AppNavBar />
        <main>
          <AppRoutes onFeatureChange={forceUpdate} />
        </main>
      </Router>
    </div>
  );
};

export default App;
