/* eslint-disable import/no-extraneous-dependencies */

import { useSelector } from 'react-redux';
import { FlagType, featuresWithOverrides } from './featureFlags';

const FEATURE_FLAGS_ADD = 'featureFlagsAdd';
const FEATURE_FLAG_EDIT = 'featureFlagsEdit';
const FEATURE_FLAGS_RESET = 'featureFlagsReset';

/** Actions  */

export const loadFeatureFlagsRedux = ({
  features,
  overrides = [],
  persist = false,
  reset,
}: {
  features: FlagType[];
  overrides?: FlagType[];
  persist?: boolean;
  reset?: boolean; // deprecate in future version
}) => ({
  type: FEATURE_FLAGS_ADD,
  payload: { features, overrides, persist, reset },
});

export const editFeatureRedux = (payload: { id: string; active: boolean }) => ({
  type: FEATURE_FLAG_EDIT,
  payload,
});

export const resetFeaturesRedux = () => ({ type: FEATURE_FLAGS_RESET });

/** Reducer */
interface FeatureFlagState {
  features: FlagType[];
  persist: boolean;
}

const initialState: FeatureFlagState = {
  features: [],
  persist: false,
};

export const reducerFeatureFlags = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case FEATURE_FLAGS_ADD: {
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
      return { ...state, persist, features: newFeatures };
    }
    case FEATURE_FLAG_EDIT: {
      const newFeatures: FlagType[] = [...state.features];
      const featureIndex = newFeatures.findIndex(
        (flag) => flag.id === action.payload.id
      );

      newFeatures[featureIndex].active = action.payload.active;
      return { ...state, features: newFeatures };
    }
    case FEATURE_FLAGS_RESET: {
      const features = [...state.features];
      const newFeatures = features.map((feature: FlagType) => ({
        ...feature,
        active: feature.original,
      }));
      return { ...state, features: newFeatures };
    }
    default: {
      return state;
    }
  }
};
export default reducerFeatureFlags;

/* *************** Selector *************** */
export const useIsFeatureActive = (flag: string, reduxKey = 'FeatureFlags') =>
  useSelector((state: any) => state[reduxKey].features).find(
    (feature: FlagType) => feature.id === flag
  )?.active || false;
