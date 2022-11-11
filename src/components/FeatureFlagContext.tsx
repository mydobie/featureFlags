import React, { ReactElement, PropsWithChildren } from 'react';

export type FlagType = {
  id: string;
  active?: boolean;
  title?: string;
  description?: string | undefined;
  original?: boolean;
};

type FeatureFlagContextType = {
  featureFlags: FlagType[];
  setFeatureFlags: (featureFlags: FlagType[]) => void;
};

export const FFContext = React.createContext<FeatureFlagContextType>({
  featureFlags: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFeatureFlags: () => {},
});

export const FeatureFlagProvider: React.FC<
  PropsWithChildren<{ features?: FlagType[] }>
> = ({ features = [], children }) => {
  const [incomingFeatures, setIncomingFeatures] =
    React.useState<FlagType[]>(features);
  const [featuresState, setFeaturesState] = React.useState<FlagType[]>([]);

  React.useEffect(() => {
    const newFeatures = [...incomingFeatures].map((feature) => {
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
    setFeaturesState(newFeatures);
  }, [incomingFeatures]);

  return (
    <FFContext.Provider
      value={{
        featureFlags: featuresState,
        setFeatureFlags: setIncomingFeatures,
      }}
    >
      {children}
    </FFContext.Provider>
  );
};

export default FeatureFlagProvider;

export const useGetFeatures = () => {
  const { featureFlags } = React.useContext(FFContext);
  // console.log('Return object:', React.useContext(FFContext));
  // console.log('Get features called:', featureFlags);
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
      setFeatureFlags(newFeatures);
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
        features[featureIndex].original = features[featureIndex].active;
      }
      if (overRide.active) {
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

export const useSetFeatureFlags = () => {
  const { setFeatureFlags } = React.useContext(FFContext);
  return setFeatureFlags;
};

export const useResetFeatureFlags = () => {
  const { featureFlags, setFeatureFlags } = React.useContext(FFContext);
  const reset = () => {
    const resetFlags = featureFlags.map((feature) => ({
      ...feature,
      active: feature.original,
    }));
    setFeatureFlags(resetFlags);
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
