/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import CoreUI, { FeatureFlagsUIProps } from './CoreUI';
import {
  useLocalStorage,
  getResetFeatureFlags,
  FEATURE_FLAGS,
  FEATURE_FLAGS_PERSIST,
} from './featureFlags';

const FeatureFlagsUI = ({
  onFeatureChange = () => {},
  onFeatureReset = () => {},
  readonly = false,
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
          onFeatureChange(id, checked);
        }}
        onFeatureReset={() => {
          const newFeatures = getResetFeatureFlags();
          setFeatures(newFeatures);
          onFeatureReset();
        }}
        readonly={readonly}
      />
    </>
  );
};

export default FeatureFlagsUI;
