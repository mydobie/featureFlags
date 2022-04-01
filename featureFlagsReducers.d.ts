import { FlagType } from './featureFlags';
/** Actions  */
export declare const loadFeatureFlagsRedux: ({ features, overrides, persist, reset, }: {
    features: FlagType[];
    overrides?: FlagType[] | undefined;
    persist?: boolean | undefined;
    reset?: boolean | undefined;
}) => {
    type: string;
    payload: {
        features: FlagType[];
        overrides: FlagType[];
        persist: boolean;
        reset: boolean | undefined;
    };
};
export declare const editFeatureRedux: (payload: {
    id: string;
    active: boolean;
}) => {
    type: string;
    payload: {
        id: string;
        active: boolean;
    };
};
export declare const resetFeaturesRedux: () => {
    type: string;
};
export declare const reducerFeatureFlags: (base: any, action: {
    type: string;
    payload: any;
}) => any;
export default reducerFeatureFlags;
export declare const useIsFeatureActive: (flag: string, reduxKey?: string) => any;
export declare const useFeatureFlagged: (flag: string, activeItem: any, fallback?: any, reduxKey?: string | undefined) => any;
