/* eslint-disable no-console */
import React from 'react';
import CoreUI from './CoreUI';
import { useLocalStorage, resetFeatureFlags } from './featureFlags';

const FeatureFlagsUI = () => {
  const [features, setFeatures] = useLocalStorage();

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
        style={{ marginLeft: '10px' }}
      >
        Refresh page to force changes
      </button>
    </>
  );
};

export default FeatureFlagsUI;
