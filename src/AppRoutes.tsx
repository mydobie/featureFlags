/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import { HOME_ROUTE, READONLY, CONTEXT } from './AppRouteNames';

import Home from './pages/Home';
import FourOhFour from './pages/FourOhFour';
import ContextPage from './pages/Context';
import ReadOnlyPage from './pages/ReadOnly';

const AppRoutes = (): ReactElement => (
  <div>
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />

      <Route path={CONTEXT} element={<ContextPage />} />

      <Route path={READONLY} element={<ReadOnlyPage />} />

      <Route path='*' element={<FourOhFour />} />
    </Routes>
  </div>
);

export default AppRoutes;
