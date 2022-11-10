/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import CoreUI, { FeatureFlagsUIProps } from './CoreUI';
import { useGetFeatures } from './FeatureFlagContext';

const FeatureFlagsUI = ({
  onFeatureChange = () => {},
  onFeatureReset = () => {},
  readonly = false,
  notDefaultIndicator,
}: FeatureFlagsUIProps): ReactElement => {
  const features = useGetFeatures();

  return (
    <>
      <CoreUI
        features={features}
        onFeatureClick={async (id, checked) => {
          // const newFeatures = [...features].map((feature) =>
          //   feature.id === id ? { ...feature, active: checked } : feature
          // );
          // setFeatures(newFeatures);
          onFeatureChange(id, checked);
        }}
        onFeatureReset={() => {
          // const newFeatures = getResetFeatureFlags();
          // setFeatures(newFeatures);
          onFeatureReset();
        }}
        readonly={readonly}
        notDefaultIndicator={notDefaultIndicator}
      />
    </>
  );
};

export default FeatureFlagsUI;
