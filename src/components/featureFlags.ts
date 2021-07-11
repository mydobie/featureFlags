import React from 'react';

/* eslint-disable no-console */
export const FEATURE_FLAGS = 'featureFlags'; // key used in local storage
// export const FEATURE_FLAGS_ADD = 'featureFlagsAdd';
export const FEATURE_FLAG_EDIT = 'featureFlagsEdit';
export const FEATURE_FLAGS_RESET = 'featureFlagsReset';
export const FEATURE_FLAGS_ADD = 'FEATURE_FLAGS_ADD';

export type actionType = {
  type: string;
  payload: { type: string; payload: any };
};

export type FlagType = {
  id: string;
  active: boolean;
  description?: string;
  original?: boolean;
};

/** Loads feature flag settings from config file  */
export const loadFeatureFlags = (
  featureArray: FlagType[] = [],
  useRedux: boolean = false,
  envVariable: string = 'REACT_APP_FEATURE_FLAGS'
) => {
  const features = [...featureArray];
  const fromProcessEnv: string = process.env[envVariable] ?? '[]';
  const envFlagOverRides: FlagType[] = JSON.parse(fromProcessEnv);

  envFlagOverRides.forEach((flag) => {
    const featureIndex = features.findIndex(
      (feature) => feature.id === flag.id
    );

    if (featureIndex === -1) {
      features.push({
        id: flag.id,
        active: flag.active,
        description: flag.description,
      });
    } else {
      features[featureIndex].active = flag.active;
    }
  });
  if (useRedux) {
    return { type: FEATURE_FLAGS_ADD, payload: features };
  }

  features.forEach((feature) => {
    addFeatureFlag(feature.id, feature.active, feature.description, useRedux);
  });
  return features;
};

/* ******************************************** */
export const resetFeatureFlags = (useRedux: boolean = false) => {
  if (useRedux) {
    return {
      type: FEATURE_FLAGS_RESET,
      payload: {},
    };
  }
  const features = getFeatureFlags();
  const newFeatures = features.map((feature) => ({
    ...feature,
    active: feature.original,
  }));
  return newFeatures;
};

/* ******************************************** */

export const getFeatureFlags = (): FlagType[] => {
  const features: FlagType[] = JSON.parse(
    localStorage.getItem(FEATURE_FLAGS) ?? '[]'
  );
  return features;
};

// @ts-ignore
export const getFeatureFlagsRedux = (state): FlagType[] =>
  state.FeatureFlags.features;

/* ******************************************** */

const addFeatureFlag = (
  id: string,
  active: boolean,
  description: string = '',
  useRedux: boolean = false
) => {
  const features: FlagType[] = JSON.parse(
    localStorage.getItem(FEATURE_FLAGS) ?? '[]'
  );

  const featureIndex = features.findIndex((flag) => flag.id === id);

  if (featureIndex === -1) {
    features.push({ id, active, description, original: active });
  } else {
    features[featureIndex].original = active;
  }
  localStorage.setItem(FEATURE_FLAGS, JSON.stringify(features));
};

/* ******************************************** */

export const editFeatureFlag = (
  id: string,
  active: boolean,
  useRedux: boolean = false
) => {
  if (useRedux) {
    return { type: FEATURE_FLAG_EDIT, payload: { id, active } };
  }

  const features: FlagType[] = JSON.parse(
    localStorage.getItem(FEATURE_FLAGS) ?? '[]'
  );

  const featureIndex = features.findIndex((flag) => flag.id === id);

  features[featureIndex].active = active;

  return localStorage.setItem(FEATURE_FLAGS, JSON.stringify(features));
};
/* ****************************************** */

// @ts-ignore
export const isFeatureActive = (flag: string, state = undefined) => {
  if (state !== undefined) {
    // @ts-ignore
    return state.FeatureFlags.features.find(
      (feature: FlagType) => feature.id === flag
    )?.active;
  }
  return getFeatureFlags().find((feature) => feature.id === flag)?.active;
};
/* ****************************************** */
export const useLocalStorage = (initialValue: any) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once

  const key = FEATURE_FLAGS;
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

/* ******************************* */
