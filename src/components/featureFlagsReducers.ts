/* eslint-disable import/no-extraneous-dependencies */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { FlagType, featuresWithOverrides } from './featureFlags';

interface FeatureFlagState {
  features: FlagType[];
  persist: boolean;
}

const initialState: FeatureFlagState = {
  features: [],
  persist: false,
};

export const featureFlagSlice = createSlice({
  name: 'featureflag',
  initialState,
  reducers: {
    loadFeatureFlagsRedux: (
      state,
      action: PayloadAction<{
        features: FlagType[];
        overrides?: FlagType[];
        persist: boolean;
        reset?: boolean; // deprecate in future version
      }>
    ) => {
      const { features, overrides, persist, reset } = action.payload;
      const newFeatures: FlagType[] =
        reset || !persist ? [] : [...state.features];
      featuresWithOverrides(features, overrides).forEach(
        (feature: FlagType) => {
          const featureIndex = newFeatures.findIndex(
            (f) => f.id === feature.id
          );
          if (featureIndex === -1) {
            newFeatures.push({ ...feature, original: feature.active });
          } else {
            newFeatures[featureIndex].original = feature.active;
          }
        }
      );
      state.persist = persist;
      state.features = newFeatures;
    },
    editFeature: (state, action: PayloadAction<FlagType>) => {
      const newFeatures: FlagType[] = [...state.features];
      const featureIndex = newFeatures.findIndex(
        (flag) => flag.id === action.payload.id
      );

      newFeatures[featureIndex].active = action.payload.active;
      state.features = newFeatures;
    },
    resetFeatures: (state) => {
      const features = [...state.features];
      const newFeatures = features.map((feature: FlagType) => ({
        ...feature,
        active: feature.original,
      }));
      // @ts-ignore
      state.features = newFeatures;
    },
  },
});

export const { loadFeatureFlagsRedux, editFeature, resetFeatures } =
  featureFlagSlice.actions;

export default featureFlagSlice.reducer;

/* *************** Selector *************** */
export const useIsFeatureActive = (flag: string, reduxKey = 'FeatureFlags') =>
  useSelector((state: any) => state[reduxKey].features).find(
    (feature: FlagType) => feature.id === flag
  )?.active || false;
