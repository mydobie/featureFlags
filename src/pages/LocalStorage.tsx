import React from 'react';
import FeatureFlagsUI from '../components/FeatureFlagsUI';
import { isFeatureActive } from '../components/featureFlags';
import { COLORS, DINOS } from '../FeatureFlagsConfig';

// eslint-disable-next-line arrow-body-style
const LocalStoragePage = () => {
  return (
    <>
      <FeatureFlagsUI />
      <hr />
      {isFeatureActive(COLORS) ? <div>COLORS!!!</div> : null}
      {isFeatureActive(DINOS) ? <div>DINOS!!!</div> : null}
    </>
  );
};

export default LocalStoragePage;
