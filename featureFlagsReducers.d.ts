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
/** Reducer */
interface FeatureFlagState {
    features: FlagType[];
    persist: boolean;
}
export declare const reducerFeatureFlags: (state: FeatureFlagState | undefined, action: {
    type: string;
    payload: any;
}) => {
    persist: any;
    features: FlagType[];
} | {
    features: {
        active: boolean | undefined;
        id: string;
        description?: string | undefined;
        original?: boolean | undefined;
    }[];
    persist: boolean;
};
export default reducerFeatureFlags;
export declare const useIsFeatureActive: (flag: string, reduxKey?: string) => any;
