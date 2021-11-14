/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import ReduxPage from './pages/Redux';
import LocalStoragePage from './pages/LocalStorage';
import ReadOnlyPage from './pages/ReadOnly';

import { HOME_ROUTE, LOCAL_STORAGE, REDUX, READONLY } from './AppRouteNames';

import Home from './pages/Home';
import FourOhFour from './pages/FourOhFour';

interface Props {
  onFeatureChange?: (flagId?: string, isActive?: boolean) => void;
}

const AppRoutes = ({ onFeatureChange = () => {} }: Props): ReactElement => (
  <div>
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />

      <Route
        path={LOCAL_STORAGE}
        element={<LocalStoragePage onFeatureChange={onFeatureChange} />}
      />

      <Route path={REDUX} element={<ReduxPage />} />

      <Route path={READONLY} element={<ReadOnlyPage />} />

      <Route path='*' element={<FourOhFour />} />
    </Routes>
  </div>
);

export default AppRoutes;
