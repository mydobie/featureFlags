/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import CoreUI, { FeatureFlagsUIProps } from './CoreUI';

import {
  useEditFeatureFlag,
  useGetFeatures,
  useResetFeatureFlags,
} from './index';

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
          editFeature(id, checked);
          onFeatureChange(id, checked);
        }}
        onFeatureReset={() => {
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
