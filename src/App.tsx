/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
// Contains routing and any application wide items like headers, footers and navigation
import React, { useReducer } from 'react';
import { HashRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
// import { connect } from 'react-redux';
import { useAppDispatch } from './redux/hooks';
import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  loadFeatureFlags,
  featuresWithOverrides,
  addFeatures,
} from './components';

import {
  featureFlagsLocalStorage,
  featureFlagsRedux,
} from './FeatureFlagsConfig';

loadFeatureFlags(
  featuresWithOverrides(
    featureFlagsLocalStorage,
    JSON.parse(process.env.REACT_APP_FEATURE_FLAGS ?? '[]')
  ) || [],
  process.env.REACT_APP_USE_LOCAL_STORAGE === 'true'
);

const App = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const dispatch = useAppDispatch();
  dispatch(
    addFeatures({
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
