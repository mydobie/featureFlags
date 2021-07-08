/* eslint-disable no-console */
import React from 'react';
import CoreUI from './CoreUI';
import {
  getFeatureFlags,
  useLocalStorage,
  resetFeatureFlags,
} from './featureFlags';

const FeatureFlagsUI = () => {
  const [features, setFeatures] = useLocalStorage(getFeatureFlags());

  return (
    <>
      <CoreUI
        features={features}
        onFeatureClick={(id, checked) => {
          const newFeatures = [...features].map((feature) =>
            feature.id === id ? { ...feature, active: checked } : feature
          );
          setFeatures(newFeatures);
        }}
        onFeatureReset={() => {
          setFeatures(resetFeatureFlags());
        }}
      />
      <button
        type='button'
        onClick={() => {
          window.location.reload();
        }}
        className='btn btn-primary'
      >
        Refresh page to force changes
      </button>
    </>
  );
};

export default FeatureFlagsUI;
