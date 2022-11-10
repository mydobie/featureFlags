/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
//import { useSelector } from 'react-redux';

import { useIsFeatureActive, FeatureFlagged } from './components';

import { HOME_ROUTE, READONLY, CONTEXT } from './AppRouteNames';
import { COLORS, DINOS } from './FeatureFlagsConfig';

const AppNavBar = (): ReactElement => {
  const isColors = useIsFeatureActive(COLORS);
  const featureNavItemStyle = { backgroundColor: '#ccc', color: '#000' };

  return (
    <nav>
      <ul className='nav'>
        <li className='nav-item'>
          <NavLink className='nav-link' to={HOME_ROUTE}>
            Home
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to={CONTEXT}>
            Context
          </NavLink>
        </li>

        <li className='nav-item'>
          <NavLink className='nav-link' to={READONLY}>
            Read only
          </NavLink>
        </li>

        {isColors ? (
          <li className='nav-item nav-link' style={featureNavItemStyle}>
            Link to Colors
          </li>
        ) : null}
        <FeatureFlagged feature={DINOS}>
          <li className='nav-item nav-link' style={featureNavItemStyle}>
            Link to Dinos
          </li>
        </FeatureFlagged>
      </ul>
    </nav>
  );
};

export default AppNavBar;
