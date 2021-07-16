import React from 'react';
import FeatureFlagsUI from '../components/FeatureFlagsUI';
import { isFeatureActive } from '../components/featureFlags';

import { COLORS, DINOS } from '../FeatureFlagsConfig';

type LocalStoragePageProps = {
  onFeatureChange: () => void;
};

// eslint-disable-next-line arrow-body-style
const LocalStoragePage = ({
  onFeatureChange = () => {},
}: LocalStoragePageProps) => (
  <div className='container'>
    <h1>Feature flags - local storage</h1>
    <FeatureFlagsUI onFeatureChange={onFeatureChange} />
    <hr />
    {isFeatureActive(COLORS) ? <div>COLORS!!!</div> : null}
    {isFeatureActive(DINOS) ? <div>DINOS!!!</div> : null}
  </div>
);

export default LocalStoragePage;
