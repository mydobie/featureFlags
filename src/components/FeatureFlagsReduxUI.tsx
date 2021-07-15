/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import CoreUI from './CoreUI';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getFeatureFlagsRedux } from './featureFlags';
import { editFeature, resetFeatures } from './featureFlagsReducers';

const FeatureFlagsReduxUI = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <CoreUI
        features={useAppSelector(getFeatureFlagsRedux)}
        onFeatureClick={(id, checked) => {
          dispatch(editFeature({ id, active: checked }));
        }}
        onFeatureReset={() => {
          dispatch(resetFeatures());
        }}
      />
    </>
  );
};

export default FeatureFlagsReduxUI;
