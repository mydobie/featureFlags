/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FlagType, getWithEnvOverrides } from './featureFlags';

interface FeatureFlagState {
  features: FlagType[];
}

const initialState: FeatureFlagState = {
  features: [],
};

export const featureFlagSlice = createSlice({
  name: 'featureflag',
  initialState,
  reducers: {
    addFeatures: (state, action: PayloadAction<FlagType[]>) => {
      const newFeatures: FlagType[] = [...state.features];
      getWithEnvOverrides(action.payload).forEach((feature: FlagType) => {
        const featureIndex = newFeatures.findIndex((f) => f.id === feature.id);
        if (featureIndex === -1) {
          newFeatures.push({ ...feature, original: feature.active });
        } else {
          newFeatures[featureIndex].original = feature.active;
        }
      });
      state.features = newFeatures;
    },
    editFeature: (state, action: PayloadAction<FlagType>) => {
      const newFeatures: FlagType[] = [...state.features];
      const featureIndex = newFeatures.findIndex(
        (flag) => flag.id === action.payload.id
      );

      newFeatures[featureIndex].active = action.payload.active;
      state.features = newFeatures; // TODO wonder if we can edit directly instead of making a copy
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

export const { addFeatures, editFeature, resetFeatures } =
  featureFlagSlice.actions;

export default featureFlagSlice.reducer;
