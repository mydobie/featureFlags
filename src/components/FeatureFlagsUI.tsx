/* eslint-disable no-console */
import React from 'react';
import CoreUI from './CoreUI';
import {
  useLocalStorage,
  resetFeatureFlags,
  FEATURE_FLAGS,
  FEATURE_FLAGS_PERSIST,
} from './featureFlags';

type FeatureFlagsUIProps = {
  onFeatureChange?: () => void;
};

const FeatureFlagsUI = ({
  onFeatureChange = () => {},
}: FeatureFlagsUIProps) => {
  const [features, setFeatures] = useLocalStorage(FEATURE_FLAGS);
  const [persist] = useLocalStorage(FEATURE_FLAGS_PERSIST);

  return (
    <>
      <CoreUI
        persist={persist}
        features={features}
        onFeatureClick={(id, checked) => {
          const newFeatures = [...features].map((feature) =>
            feature.id === id ? { ...feature, active: checked } : feature
          );
          setFeatures(newFeatures);
          onFeatureChange();
        }}
        onFeatureReset={() => {
          setFeatures(resetFeatureFlags());
          onFeatureChange();
        }}
      />
    </>
  );
};

export default FeatureFlagsUI;
