import {
  FlagType,
  FEATURE_FLAGS_ADD,
  FEATURE_FLAG_EDIT,
  FEATURE_FLAGS_RESET,
  actionType,
} from './featureFlags';

const initialState = { features: [] };

const Reducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    // EXAMPLE: Reducer case
    case FEATURE_FLAGS_ADD: {
      // @ts-ignore
      const features: FlagType[] = action.payload;
      const newFeatures: FlagType[] = [...state.features];

      features.forEach((feature: FlagType) => {
        const featureIndex = newFeatures.findIndex((f) => f.id === feature.id);
        if (featureIndex === -1) {
          newFeatures.push({ ...feature, original: feature.active });
        } else {
          newFeatures[featureIndex].original = feature.active;
        }
      });
      return { ...state, features: newFeatures };
    }
    case FEATURE_FLAG_EDIT: {
      const feature = action.payload;
      const newFeatures: FlagType[] = [...state.features];
      const featureIndex = newFeatures.findIndex(
        // @ts-ignore
        (flag) => flag.id === feature.id
      );
      // @ts-ignore
      newFeatures[featureIndex].active = feature.active;
      return { ...state, features: newFeatures };
    }
    case FEATURE_FLAGS_RESET: {
      const newFeatures = state.features.map((feature: FlagType) => ({
        ...feature,
        active: feature.original,
      }));
      return { ...state, features: newFeatures };
    }

    default:
      return state;
  }
};

export default Reducer;
