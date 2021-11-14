/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CoreUI, { FeatureFlagsUIProps } from './CoreUI';

import { getFeatureFlagsRedux, getPersistRedux } from './featureFlags';
import { editFeatureRedux, resetFeaturesRedux } from './featureFlagsReducers';

const FeatureFlagsReduxUI = ({
  onFeatureChange = () => {},
  onFeatureReset = () => {},
  readonly = false,
}: FeatureFlagsUIProps): ReactElement => {
  const dispatch = useDispatch();
  return (
    <>
      <CoreUI
        features={useSelector(getFeatureFlagsRedux)}
        onFeatureClick={(id, checked) => {
          dispatch(editFeatureRedux({ id, active: checked }));
          onFeatureChange(id, checked);
        }}
        onFeatureReset={() => {
          dispatch(resetFeaturesRedux());
          onFeatureReset();
        }}
        persist={useSelector(getPersistRedux)}
        readonly={readonly}
      />
    </>
  );
};

export default FeatureFlagsReduxUI;
