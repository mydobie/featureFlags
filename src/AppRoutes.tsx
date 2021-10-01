/* eslint-disable import/no-extraneous-dependencies */
// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import ReduxPage from './pages/Redux';
import LocalStoragePage from './pages/LocalStorage';

import { HOME_ROUTE, LOCAL_STORAGE, REDUX } from './AppRouteNames';

import Home from './pages/Home';
import FourOhFour from './pages/FourOhFour';

interface Props {
  onFeatureChange?: (flagId?: string, isActive?: boolean) => void;
}

const AppRoutes = ({ onFeatureChange = () => {} }: Props): ReactElement => (
  <div>
    <Switch>
      <Route path={HOME_ROUTE} exact>
        <Home />
      </Route>

      <Route path={LOCAL_STORAGE}>
        <LocalStoragePage onFeatureChange={onFeatureChange} />
      </Route>

      <Route path={REDUX}>
        <ReduxPage />
      </Route>

      <Route path='/'>
        <FourOhFour />
      </Route>
    </Switch>
  </div>
);

export default AppRoutes;
