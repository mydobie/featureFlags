/* eslint-disable import/no-extraneous-dependencies */
// Contains routing and any application wide items like headers, footers and navigation

import { useDispatch } from 'react-redux';

import React, { ReactElement, useReducer } from 'react';
import { HashRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import { loadFeatureFlags, loadFeatureFlagsRedux } from './components';

import {
  featureFlagsLocalStorage,
  featureFlagsRedux,
} from './FeatureFlagsConfig';

const App = (): ReactElement => {
  // This forces the entire app to re-render which might be needed
  // if the feature flags are modified
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Instead of getting the features flag from the config file,
    // an ajax call could be made here instead and
    // loadFeatureFlagsRedux or loadFeatureFlags could be called
    // once the feature flags are loaded

    dispatch(
      loadFeatureFlagsRedux({
        features: featureFlagsRedux || [],
        overrides: JSON.parse(process.env.REACT_APP_FEATURE_FLAGS ?? '[]'),
        persist:
          process.env.REACT_APP_USE_LOCAL_STORAGE === 'true' &&
          process.env.REACT_APP_FEATURE_FLAGS_PERSIST === 'true',
      })
    );

    loadFeatureFlags({
      features: featureFlagsLocalStorage,
      overrides: JSON.parse(process.env.REACT_APP_FEATURE_FLAGS ?? '[]'),
      persist: process.env.REACT_APP_FEATURE_FLAGS_PERSIST === 'true',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
