/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isFeatureActive } from './components';

import { HOME_ROUTE, LOCAL_STORAGE, REDUX, READONLY } from './AppRouteNames';
import { COLORS, DINOS, FRUITS, VEGGIES } from './FeatureFlagsConfig';

const AppNavBar = (): ReactElement => {
  const isVeggies = useSelector((state) => isFeatureActive(VEGGIES, state));
  const isFruits = useSelector((state) => isFeatureActive(FRUITS, state));

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
          <NavLink className='nav-link' to={LOCAL_STORAGE}>
            Local storage
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to={REDUX}>
            Redux
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to={READONLY}>
            Read only
          </NavLink>
        </li>
        {isFeatureActive(COLORS) ? (
          <li className='nav-item nav-link' style={featureNavItemStyle}>
            Link to Colors
          </li>
        ) : null}
        {isFeatureActive(DINOS) ? (
          <li className='nav-item nav-link' style={featureNavItemStyle}>
            Link to Dinos
          </li>
        ) : null}
        {isFruits ? (
          <li className='nav-item nav-link' style={featureNavItemStyle}>
            Link to Fruits
          </li>
        ) : null}
        {isVeggies ? (
          <li className='nav-item nav-link' style={featureNavItemStyle}>
            Link to Veggies
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default AppNavBar;
