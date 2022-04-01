export declare const FEATURE_FLAGS = "featureFlags";
export declare const FEATURE_FLAGS_PERSIST = "featuresFlagsPersist";
export declare type FlagType = {
    id: string;
    active: boolean;
    description?: string;
    original?: boolean;
};
export declare const featuresWithOverrides: (featuresArray?: FlagType[], overRidesArray?: FlagType[]) => FlagType[];
declare type LoadFeatureFlagsType = {
    features: FlagType[];
    persist?: boolean;
    overrides?: FlagType[];
};
export declare const getFeatureFlagsRedux: (state: any) => FlagType[];
export declare const getPersistRedux: (state: any) => boolean;
export declare const editFeatureFlag: (id: string, active: boolean) => void;
export declare const isFeatureActive: (flag: string, reduxState?: any, reduxKey?: string) => boolean;
export declare const featureFlagged: (flag: string, activeItem: any, fallback?: any, reduxState?: any, reduxKey?: string | undefined) => any;
export declare const useLocalStorage: (type: string, initialValue?: any) => [any, (value: any) => void];
/** Loads feature flag settings from config file  */
export declare const loadFeatureFlags: ({ features, persist, overrides, }: LoadFeatureFlagsType) => FlagType[];
export declare const getResetFeatureFlags: () => FlagType[];
export {};
