/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { NavLink } from 'react-router-dom';

import { HOME_ROUTE, LOCAL_STORAGE, REDUX } from './AppRouteNames';

const AppNavBar = () => (
  <nav>
    <ul className='nav'>
      <li className='nav-item'>
        <NavLink activeClassName='active' className='nav-link' to={HOME_ROUTE}>
          Home
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink
          activeClassName='active'
          className='nav-link'
          to={LOCAL_STORAGE}
        >
          Local storage
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink activeClassName='active' className='nav-link' to={REDUX}>
          Redux
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default AppNavBar;
