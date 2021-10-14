/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

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
): FlagType[] => {
  const features = Array.from(featuresArray);

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

type LoadFeatureFlagsType = {
  features: FlagType[];
  persist?: boolean;
  overrides?: FlagType[];
};

/* ******************************************** */
// Private
const getFeatureFlags = (): FlagType[] => {
  const features: FlagType[] = JSON.parse(
    localStorage.getItem(FEATURE_FLAGS) ?? '[]'
  );
  return features;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const getFeatureFlagsRedux = (state: any): FlagType[] =>
  state.FeatureFlags.features;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const getPersistRedux = (state: any): boolean =>
  state.FeatureFlags.persist;

/* ******************************************** */

// Private
const addFeatureFlag = (id: string, active: boolean, description = '') => {
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

export const editFeatureFlag = (id: string, active: boolean): void => {
  const features: FlagType[] = JSON.parse(
    localStorage.getItem(FEATURE_FLAGS) ?? '[]'
  );

  const featureIndex = features.findIndex((flag) => flag.id === id);

  features[featureIndex].active = active;

  return localStorage.setItem(FEATURE_FLAGS, JSON.stringify(features));
};
/* ****************************************** */

export const isFeatureActive = (
  flag: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  reduxState: any = undefined,
  reduxKey = 'FeatureFlags'
): boolean => {
  if (reduxState !== undefined) {
    return reduxState[reduxKey].features.find(
      (feature: FlagType) => feature.id === flag
    )?.active;
  }

  return (
    getFeatureFlags().find((feature) => feature.id === flag)?.active || false
  );
};

/* ****************************************** */
export const useLocalStorage = (
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue: any = undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [any, (value: any) => void] => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

/** Loads feature flag settings from config file  */
export const loadFeatureFlags = ({
  features,
  persist,
  overrides,
}: LoadFeatureFlagsType): FlagType[] => {
  if (!persist) {
    localStorage.setItem(FEATURE_FLAGS, JSON.stringify([]));
  }
  localStorage.setItem(FEATURE_FLAGS_PERSIST, persist ? 'true' : 'false');

  featuresWithOverrides(features || [], overrides || []).forEach((feature) => {
    addFeatureFlag(feature.id, feature.active, feature.description);
  });
  return features;
};

/* ******************************************** */
export const getResetFeatureFlags = (): FlagType[] => {
  const features = getFeatureFlags();
  const newFeatures = features.map((feature) => ({
    ...feature,
    active: feature.original || false,
  }));
  return newFeatures;
};
