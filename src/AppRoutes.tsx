// Contains routing for entire application

import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import FeatureFlagsUI from './components/FeatureFlagsUI';

import LocalStoragePage from './pages/LocalStorage';

import { HOME_ROUTE, LOCAL_STORAGE } from './AppRouteNames';

import Home from './pages/Home';
import FourOhFour from './pages/FourOhFour';

interface Props {
  onFeatureChange?: () => void;
}

const AppRoutes = (props: Props) => {
  const {} = props;
  return (
    <div>
      <Switch>
        <Route path={HOME_ROUTE} exact>
          <Home />
        </Route>

        <Route path={LOCAL_STORAGE}>
          <LocalStoragePage />
        </Route>

        <Route path='/'>
          <FourOhFour />
        </Route>
      </Switch>
    </div>
  );
};

export default AppRoutes;
