/* eslint-disable react/prop-types */
// List all the components you want users to be able to call

import React from 'react';
import FFUI from './FeatureFlagsUI';

import FFUIRedux from './FeatureFlagsReduxUI';

import {
  loadFeatureFlags as load,
  reducerFeatureFlags as reducer,
  getFeatures as get,
  isFeatureActive as isActive,
  resetFeatureFlags as reset,
} from './featureFlags';

export const FeatureFlagsUI = (props) => {
  const { onFeatureChange, readonly } = props;
  return <FFUI onFeatureChange={onFeatureChange} readonly={readonly} />;
};

export const FeatureFlagsReduxUI = (props) => {
  const { onFeatureChange, readonly } = props;
  return <FFUIRedux onFeatureChange={onFeatureChange} readonly={readonly} />;
};

export const loadFeatureFlags = (
  featureArray = [],
  useRedux = false,
  callback = () => {},
  envVariable = 'REACT_APP_FEATURE_FLAGS'
) => load(featureArray, useRedux, callback, envVariable);

export const reducerFeatureFlags = (state = { flags: [] }, action) =>
  reducer(state, action);

export const getFeatures = (state = null) => get(state);

export const isFeatureActive = (id, featuresFromRedux = null) =>
  isActive(id, featuresFromRedux);

export const resetFeatureFlags = (useRedux = false) => reset(useRedux);
