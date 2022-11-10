/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import CoreUI, { FeatureFlagsUIProps } from './CoreUI';

import {
  useEditFeatureFlag,
  useGetFeatures,
  useResetFeatureFlags,
} from './FeatureFlagContext';

const FeatureFlagsUI = ({
  onFeatureChange = () => {},
  onFeatureReset = () => {},
  readonly = false,
  notDefaultIndicator,
}: FeatureFlagsUIProps): ReactElement => {
  const features = useGetFeatures();
  const editFeature = useEditFeatureFlag();
  const resetFlags = useResetFeatureFlags();
  const persist = false; // KKD - change me

  return (
    <>
      <CoreUI
        persist={persist}
        features={features}
        onFeatureClick={(id, checked) => {
          console.log('Clicked, ', id, checked);
          editFeature(id, checked);
          onFeatureChange(id, checked);
        }}
        onFeatureReset={() => {
          //   const newFeatures = getResetFeatureFlags();
          //   setFeatures(newFeatures);
          resetFlags();
          onFeatureReset();
        }}
        readonly={readonly}
        notDefaultIndicator={notDefaultIndicator}
      />
    </>
  );
};

export default FeatureFlagsUI;
