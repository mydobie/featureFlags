export const FEATURE_FLAGS = 'featureFlags'; // key used in local storage
export const FEATURE_FLAGS_ADD = 'featureFlagsAdd';
export const FEATURE_FLAG_EDIT = 'featureFlagsEdit';
export const FEATURE_FLAGS_RESET = 'featureFlagsReset';

/* ************** ACTIONS *************** */
export const loadFeatureFlags = (
  featureArray = [],
  useRedux = false,
  callback = () => {},
  envVariable = 'REACT_APP_FEATURE_FLAGS'
) => {
  let flagArray = [];

  flagArray = featureArray.map((flag) => ({
    id: flag.id,
    active: flag.active || false,
    description: flag.description,
    original: flag.active || false,
  }));

  // eslint-disable-next-line no-unused-vars
  const fromProcessEnv = process.env[envVariable];
  const envFlagOverRides = fromProcessEnv ? JSON.parse(fromProcessEnv) : [];
  envFlagOverRides.forEach((flag) => {
    const index = flagArray.findIndex((f) => f.id === flag.id);
    if (index === -1) {
      flagArray.push({
        id: flag.id,
        active: flag.active || false,
        description: flag.description,
        original: flag.active || false,
      });
    } else {
      const newFlag = { ...flag };
      const existing = flagArray[index];
      newFlag.description = flag.description || existing.description;
      newFlag.active = flag.active || existing.active;
      newFlag.original = newFlag.active;
      flagArray[index] = newFlag;
    }
  });
  if (useRedux) {
    return { type: FEATURE_FLAGS_ADD, payload: flagArray };
  }
  callback(flagArray);
  return localStorage.setItem(FEATURE_FLAGS, JSON.stringify(flagArray));
};

export const editFeatureFlag = (id, active, useRedux = false) => {
  if (useRedux) {
    return { type: FEATURE_FLAG_EDIT, payload: { id, active } };
  }
  const features = JSON.parse(localStorage.getItem(FEATURE_FLAGS));
  const newFeatures = features.map((flag) => {
    if (flag.id === id) {
      const newFlag = { ...flag, active };
      return newFlag;
    }
    return flag;
  });
  localStorage.setItem(FEATURE_FLAGS, JSON.stringify(newFeatures));
  return newFeatures;
};

export const resetFeatureFlags = (useRedux = false) => {
  if (useRedux) {
    return { type: FEATURE_FLAGS_RESET };
  }
  const features = JSON.parse(localStorage.getItem(FEATURE_FLAGS));
  const newFeatures = features.map((flag) => ({
    ...flag,
    active: flag.original,
  }));
  localStorage.setItem(FEATURE_FLAGS, JSON.stringify(newFeatures));
  return newFeatures;
};

/* ************** REDUCERS *************** */
export const reducerFeatureFlags = (state = { flags: [] }, action) => {
  switch (action.type) {
    case FEATURE_FLAGS_ADD: {
      return { ...state, flags: action.payload };
    }
    case FEATURE_FLAG_EDIT: {
      const { id, active } = action.payload;
      const newFlags = [...state.flags];
      const index = newFlags.findIndex((flag) => flag.id === id);

      if (index === -1) {
        return state;
      }
      newFlags[index].active = active;
      return { ...state, flags: newFlags };
    }
    case FEATURE_FLAGS_RESET: {
      const newFlags = state.flags.map((flag) => ({
        ...flag,
        active: flag.original,
      }));
      return { ...state, flags: newFlags };
    }
    default: {
      return state;
    }
  }
};

/* ******************* SELECTORS ************************ */
export const getFeatures = (state = null) => {
  if (state === null) {
    return JSON.parse(localStorage.getItem(FEATURE_FLAGS));
  }
  return state.reducerFeatureFlags.flags;
};

export const isFeatureActive = (id, featuresFromRedux = null) => {
  let features = featuresFromRedux;
  if (features === null) {
    features = getFeatures();
  }
  if (!features) return undefined;
  const newFeature = features.find((flag) => flag.id === id);

  return newFeature === undefined ? undefined : newFeature.active;
};
