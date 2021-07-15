import React from 'react';
import FeatureFlagsUI from '../components/FeatureFlagsUI';
import { isFeatureActive, useLocalStorage } from '../components/featureFlags';

import { COLORS, DINOS } from '../FeatureFlagsConfig';

// eslint-disable-next-line arrow-body-style
const LocalStoragePage = () => {
  const [features] = useLocalStorage();
  // eslint-disable-next-line no-console
  console.log('FEATURES:', features);
  return (
    <div className='container'>
      <h1>Feature flags - local storage</h1>
      <FeatureFlagsUI />
      <hr />
      {isFeatureActive(COLORS, features) ? <div>COLORS!!!</div> : null}
      {isFeatureActive(DINOS) ? <div>DINOS!!!</div> : null}
    </div>
  );
};

export default LocalStoragePage;
