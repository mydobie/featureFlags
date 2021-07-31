/* eslint-disable no-console */
import React, { ReactElement } from 'react';
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
}: FeatureFlagsUIProps): ReactElement => {
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
          const newFeatures = getResetFeatureFlags();
          setFeatures(newFeatures);
          onFeatureChange(newFeatures);
        }}
      />
    </>
  );
};

export default FeatureFlagsUI;
