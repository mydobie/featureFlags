/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { RootState } from '../redux/store';

export const FEATURE_FLAGS = 'featureFlags'; // key used in local storage
export const FEATURE_FLAGS_PERSIST = 'featuresFlagsPersist';

export type FlagType = {
  id: string;
  active: boolean;
  description?: string;
  original?: boolean;
};

export const featuresWithOverrides = (
  featuresArray: FlagType[] = [],
  overRidesArray: FlagType[] = []
) => {
  const features = [...featuresArray];
  overRidesArray.forEach((flag) => {
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
  return features;
};

/** Loads feature flag settings from config file  */
export const loadFeatureFlags = (
  features: FlagType[] = [],
  persistLocalStorage: boolean = false
) => {
  if (persistLocalStorage === false) {
    localStorage.setItem(FEATURE_FLAGS, JSON.stringify([]));
  }
  localStorage.setItem(
    FEATURE_FLAGS_PERSIST,
    persistLocalStorage ? 'true' : 'false'
  );

  features.forEach((feature) => {
    addFeatureFlag(feature.id, feature.active, feature.description);
  });
  return features;
};

/* ******************************************** */
export const resetFeatureFlags = (useRedux: boolean = false) => {
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

export const getFeatureFlagsRedux = (state: RootState): FlagType[] =>
  state.FeatureFlags.features;

export const getPersistRedux = (state: RootState): boolean =>
  state.FeatureFlags.persist;

/* ******************************************** */

const addFeatureFlag = (
  id: string,
  active: boolean,
  description: string = ''
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
  const features: FlagType[] = JSON.parse(
    localStorage.getItem(FEATURE_FLAGS) ?? '[]'
  );

  const featureIndex = features.findIndex((flag) => flag.id === id);

  features[featureIndex].active = active;

  return localStorage.setItem(FEATURE_FLAGS, JSON.stringify(features));
};
/* ****************************************** */

export const isFeatureActive = (flag: string, reduxState: any = undefined) => {
  if (reduxState !== undefined) {
    if (reduxState.FeatureFlags) {
      return reduxState.FeatureFlags.features.find(
        (feature: FlagType) => feature.id === flag
      )?.active;
    }
    return reduxState.find((feature: FlagType) => feature.id === flag)?.active;
  }

  return getFeatureFlags().find((feature) => feature.id === flag)?.active;
};

/* ****************************************** */
export const useLocalStorage = (
  type: string,
  initialValue: any = undefined
) => {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once

  const key = type;
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
