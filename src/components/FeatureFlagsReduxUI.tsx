/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CoreUI from './CoreUI';

import { getFeatureFlagsRedux, getPersistRedux } from './featureFlags';
import { editFeature, resetFeatures } from './featureFlagsReducers';

const FeatureFlagsReduxUI = (): ReactElement => {
  const dispatch = useDispatch();
  return (
    <>
      <CoreUI
        features={useSelector(getFeatureFlagsRedux)}
        onFeatureClick={(id, checked) => {
          dispatch(editFeature({ id, active: checked }));
        }}
        onFeatureReset={() => {
          dispatch(resetFeatures());
        }}
        persist={useSelector(getPersistRedux)}
      />
    </>
  );
};

export default FeatureFlagsReduxUI;
