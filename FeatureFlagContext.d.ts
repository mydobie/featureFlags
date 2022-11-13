import React, { ReactElement, PropsWithChildren } from 'react';
export declare const LOCAL_STORAGE_KEY = "FEATURE_FLAGS";
export declare type FlagType = {
    id: string;
    active?: boolean;
    title?: string;
    description?: string | undefined;
    original?: boolean;
};
declare type FeatureFlagContextType = {
    featureFlags: FlagType[];
    setFeatureFlags: (featureFlags: FlagType[], isEdit?: boolean) => void;
    persist?: boolean;
};
export declare const FFContext: React.Context<FeatureFlagContextType>;
export declare const FeatureFlagProvider: React.FC<PropsWithChildren<{
    features?: FlagType[];
    persist?: boolean;
    hideWarnings?: boolean;
}>>;
export default FeatureFlagProvider;
export declare const useGetFeatures: () => FlagType[];
export declare const useIsFeatureActive: (featureId: string) => boolean;
export declare const useEditFeatureFlag: () => (featureId: string, isActive: boolean) => void;
export declare const featuresWithOverrides: (featuresArray?: FlagType[], overRidesArray?: FlagType[]) => FlagType[];
export declare const useSetFeatureFlags: (isEdit?: boolean) => (features: FlagType[]) => void;
export declare const useResetFeatureFlags: () => () => void;
export declare const FeatureFlagged: React.FC<{
    feature: string;
    children?: ReactElement | string;
    isNotActive?: boolean;
}>;
