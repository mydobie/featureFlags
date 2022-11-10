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

const FeatureFlagContext: React.FC<
  PropsWithChildren<{ flags?: FlagType[] }>
> = ({ flags = [], children }) => {
  const [incomingFeatures, setIncomingFeatures] =
    React.useState<FlagType[]>(flags);
  const [features, setFeatures] = React.useState<FlagType[]>([]);

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
    setFeatures(newFeatures);
  }, [incomingFeatures]);

  return (
    <FFContext.Provider
      value={{ featureFlags: features, setFeatureFlags: setIncomingFeatures }}
    >
      {children}
    </FFContext.Provider>
  );
};

export default FeatureFlagContext;

export const useGetFeatures = () => {
  const { featureFlags } = React.useContext(FFContext);
  // console.log('Return object:', React.useContext(FFContext));
  // console.log('Get features called:', featureFlags);
  return featureFlags || [];
};

export const useIsFeatureActive = (flagId: string) => {
  const featureFlags = useGetFeatures();
  return featureFlags.find((feature) => feature.id === flagId)?.active || false;
};

export const useEditFeatureFlag = () => {
  const { featureFlags, setFeatureFlags } = React.useContext(FFContext);

  const editFeature = (flagId: string, active: boolean) => {
    const newFeatures = featureFlags ? [...featureFlags] : [];
    const featureIndex = newFeatures.findIndex((flag) => flag.id === flagId);
    if (featureIndex !== undefined) {
      newFeatures[featureIndex].active = active;
      setFeatureFlags(newFeatures);
    }
  };
  return editFeature;
};

// KKD - This needs a lot of work
// It will be available as a helper
// but will no longer be used directly
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
        title: flag.title,
        description: flag.description,
      });
    } else {
      features[featureIndex].active = flag.active;
    }
  });
  return features;
};

export const useSetFeatureFlags = () => {
  const { setFeatureFlags } = React.useContext(FFContext);
  // If needed we can return a function that
  // can take in an override
  // See useEditFeatureFlag
  return setFeatureFlags;
};

export const useResetFeatureFlags = () => {
  const { featureFlags, setFeatureFlags } = React.useContext(FFContext);
  const reset = () => {
    const resetFlags = featureFlags.map((flag) => ({
      ...flag,
      active: flag.original,
    }));
    setFeatureFlags(resetFlags);
  };
  return reset;
};

export const FeatureFlagged: React.FC<{
  flag: string;
  children?: ReactElement | string;
}> = ({ flag, children }) => {
  const isActive = useIsFeatureActive(flag);
  return <>{isActive ? children : null}</>;
};
