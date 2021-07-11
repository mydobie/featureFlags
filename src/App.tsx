/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Contains routing and any application wide items like headers, footers and navigation
import React from 'react';
import { HashRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { connect } from 'react-redux';
import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { loadFeatureFlags } from './components/featureFlags';
import {
  featureFlagsLocalStorage,
  featureFlagsRedux,
} from './FeatureFlagsConfig';

// @ts-ignore
const App = ({ loadFeatureToRedux }) => {
  const basename = '';
  loadFeatureFlags(featureFlagsLocalStorage || []);
  loadFeatureToRedux(featureFlagsRedux || []);

  return (
    <div>
      <Router basename={basename}>
        <AppNavBar />
        <main>
          <AppRoutes />
        </main>
      </Router>
    </div>
  );
};

const mapStateToProps = () => ({});

/// @ts-ignore
const mapDispatchToProps = (dispatch) => ({
  // @ts-ignore
  loadFeatureToRedux: (features) => dispatch(loadFeatureFlags(features, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
