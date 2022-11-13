/* eslint-disable no-console */
import React, { ReactElement, PropsWithChildren } from 'react';
import useLocalStorage from './useLocalStorage';

export const LOCAL_STORAGE_KEY = 'FEATURE_FLAGS';

export type FlagType = {
  id: string;
  active?: boolean;
  title?: string;
  description?: string | undefined;
  original?: boolean;
};

type FeatureFlagContextType = {
  featureFlags: FlagType[];
  setFeatureFlags: (featureFlags: FlagType[], isEdit?: boolean) => void;
  persist?: boolean;
};

export const FFContext = React.createContext<FeatureFlagContextType>({
  featureFlags: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFeatureFlags: () => {},
  persist: false,
});

const formatFeatures = (features: FlagType[]) =>
  [...features].map((feature) => {
    if (feature.original !== undefined && feature.active !== undefined) {
      return feature;
    }
    if (feature.active === undefined) {
      feature.active = false;
    }
    if (feature.original === undefined) {
      feature.original = feature.active;
    }
    return feature;
  });

const setFlagsForLocalStorage = (features: FlagType[]) =>
  [...features].map((feature) => ({ id: feature.id, active: feature.active }));

export const FeatureFlagProvider: React.FC<
  PropsWithChildren<{
    features?: FlagType[];
    persist?: boolean;
    hideWarnings?: boolean;
  }>
> = ({ features = [], children, persist, hideWarnings }) => {
  const [localStorage, setLocalStorage] = useLocalStorage(LOCAL_STORAGE_KEY);
  const [featuresState, setFeaturesState] = React.useState<FlagType[]>(
    formatFeatures(features)
  );

  React.useEffect(() => {
    if (persist && !hideWarnings) {
      console.warn(
        'Feature flags are set to persist on page refresh.  This is not recommended in production environments.'
      );
    }
  }, [hideWarnings, persist]);

  const updateFeatures = (incomingFeatures: FlagType[], isEdit?: boolean) => {
    let updatedIncomingFeatures = [...incomingFeatures];
    if (persist) {
      if (!isEdit) {
        updatedIncomingFeatures = featuresWithOverrides(
          incomingFeatures,
          localStorage as FlagType[]
        );
      }

      setLocalStorage(setFlagsForLocalStorage(updatedIncomingFeatures));
    }
    setFeaturesState(updatedIncomingFeatures);
  };
  React.useEffect(() => {
    if (persist) {
      updateFeatures(formatFeatures(features));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FFContext.Provider
      value={{
        featureFlags: featuresState,
        setFeatureFlags: updateFeatures,
        persist: persist,
      }}
    >
      {children}
    </FFContext.Provider>
  );
};

export default FeatureFlagProvider;

export const useGetFeatures = () => {
  const { featureFlags } = React.useContext(FFContext);
  return featureFlags || [];
};

export const useIsFeatureActive = (featureId: string) => {
  const featureFlags = useGetFeatures();
  return (
    featureFlags.find((feature) => feature.id === featureId)?.active || false
  );
};

export const useEditFeatureFlag = () => {
  const { featureFlags, setFeatureFlags } = React.useContext(FFContext);

  const editFeature = (featureId: string, isActive: boolean) => {
    const newFeatures = featureFlags ? [...featureFlags] : [];
    const featureIndex = newFeatures.findIndex((flag) => flag.id === featureId);
    if (featureIndex !== undefined) {
      newFeatures[featureIndex].active = isActive;
      setFeatureFlags(newFeatures, true);
    } else {
      console.error('Attempting to set unknown feature flag ', featureId);
    }
  };
  return editFeature;
};

export const featuresWithOverrides = (
  featuresArray: FlagType[] = [],
  overRidesArray: FlagType[] = []
): FlagType[] => {
  const features = [...featuresArray];

  overRidesArray.forEach((overRide) => {
    const featureIndex = features.findIndex(
      (feature) => feature.id === overRide.id
    );
    if (featureIndex !== -1) {
      if (features[featureIndex].original === undefined) {
        // This really shouldn't be needed - but adding just in case
        features[featureIndex].original = features[featureIndex].active;
      }
      if (overRide.active !== undefined) {
        features[featureIndex].active = overRide.active;
      }
      if (overRide.description) {
        features[featureIndex].description = overRide.description;
      }
      if (overRide.title) {
        features[featureIndex].title = overRide.title;
      }
    }
  });
  return features;
};

export const useSetFeatureFlags = (isEdit?: boolean) => {
  const { setFeatureFlags } = React.useContext(FFContext);
  const setFormattedFeatures = (features: FlagType[]) => {
    setFeatureFlags(formatFeatures(features), isEdit);
  };
  return setFormattedFeatures;
};

export const useResetFeatureFlags = () => {
  const { featureFlags, setFeatureFlags } = React.useContext(FFContext);
  const reset = () => {
    const resetFlags = featureFlags.map((feature) => ({
      ...feature,
      active: feature.original,
    }));
    setFeatureFlags(resetFlags, true);
  };
  return reset;
};

export const FeatureFlagged: React.FC<{
  feature: string;
  children?: ReactElement | string;
  isNotActive?: boolean;
}> = ({ feature, children, isNotActive }) => {
  const isActive = useIsFeatureActive(feature);
  return (
    <>
      {(isActive && !isNotActive) || (!isActive && isNotActive)
        ? children
        : null}
    </>
  );
};
