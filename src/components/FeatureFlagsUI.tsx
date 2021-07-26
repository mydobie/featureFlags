/* eslint-disable no-console */
import React from 'react';
import CoreUI from './CoreUI';
import {
  useLocalStorage,
  getResetFeatureFlags,
  FEATURE_FLAGS,
  FEATURE_FLAGS_PERSIST,
  FlagType,
} from './featureFlags';

type FeatureFlagsUIProps = {
  onFeatureChange?: (features: FlagType[]) => void;
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
        onFeatureClick={async (id, checked) => {
          const newFeatures = [...features].map((feature) =>
            feature.id === id ? { ...feature, active: checked } : feature
          );
          setFeatures(newFeatures);
          onFeatureChange(newFeatures);
        }}
        onFeatureReset={() => {
          setFeatures(getResetFeatureFlags());
          onFeatureChange(features);
        }}
      />
    </>
  );
};

export default FeatureFlagsUI;
