/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { FeatureFlagsReduxUI, isFeatureActive } from '../components';

import { VEGGIES, FRUITS } from '../FeatureFlagsConfig';

const ReduxPage = () => {
  const isVeggies = useAppSelector((state) => isFeatureActive(VEGGIES, state));
  const isFruits = useAppSelector((state) => isFeatureActive(FRUITS, state));
  return (
    <div className='container'>
      <h1>Feature flags - redux</h1>
      <FeatureFlagsReduxUI />
      <hr />
      {isVeggies ? <div>VEGGIES!!!</div> : null}
      {isFruits ? <div>FRUITS!!!</div> : null}
    </div>
  );
};

export default ReduxPage;
