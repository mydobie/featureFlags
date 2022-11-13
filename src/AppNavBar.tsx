import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
//import { useSelector } from 'react-redux';

import { useIsFeatureActive, FeatureFlagged } from './components';

import { HOME_ROUTE, READONLY, CONTEXT } from './AppRouteNames';
import { SWEETS, DINOS } from './FeatureFlagsConfig';

const AppNavBar = (): ReactElement => {
  const isSweets = useIsFeatureActive(SWEETS);
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
            Features
          </NavLink>
        </li>

        <li className='nav-item'>
          <NavLink className='nav-link' to={READONLY}>
            Read only
          </NavLink>
        </li>

        {isSweets ? (
          <li className='nav-item nav-link' style={featureNavItemStyle}>
            Sample link to sweets
          </li>
        ) : null}
        <FeatureFlagged feature={DINOS}>
          <li className='nav-item nav-link' style={featureNavItemStyle}>
            Sample link to Dinos
          </li>
        </FeatureFlagged>
      </ul>
    </nav>
  );
};

export default AppNavBar;
