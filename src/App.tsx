// Contains routing and any application wide items like headers, footers and navigation

import React, { ReactElement } from 'react';
import { HashRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';

import { featureFlagsLocalStorage } from './FeatureFlagsConfig';

import { useSetFeatureFlags } from './components';

const App = (): ReactElement => {
  const setFeatureFlags = useSetFeatureFlags();
  const basename = '';
  React.useEffect(() => {
    setTimeout(() => {
      setFeatureFlags(featureFlagsLocalStorage);
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

export default App;
