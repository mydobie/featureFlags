/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CoreUI, { FeatureFlagsUIProps } from './CoreUI';

import { getFeatureFlagsRedux, getPersistRedux } from './featureFlags';
import { editFeature, resetFeatures } from './featureFlagsReducers';

const FeatureFlagsReduxUI = ({
  onFeatureChange = () => {},
  onFeatureReset = () => {},
}: FeatureFlagsUIProps): ReactElement => {
  const dispatch = useDispatch();
  return (
    <>
      <CoreUI
        features={useSelector(getFeatureFlagsRedux)}
        onFeatureClick={(id, checked) => {
          dispatch(editFeature({ id, active: checked }));
          onFeatureChange(id, checked);
        }}
        onFeatureReset={() => {
          dispatch(resetFeatures());
          onFeatureReset();
        }}
        persist={useSelector(getPersistRedux)}
      />
    </>
  );
};

export default FeatureFlagsReduxUI;
