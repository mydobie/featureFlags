import { PayloadAction } from '@reduxjs/toolkit';
import { FlagType } from './featureFlags';
interface FeatureFlagState {
    features: FlagType[];
    persist: boolean;
}
export declare const featureFlagSlice: import("@reduxjs/toolkit").Slice<FeatureFlagState, {
    loadFeatureFlagsRedux: (state: import("immer/dist/internal").WritableDraft<FeatureFlagState>, action: {
        payload: {
            features: FlagType[];
            overrides?: FlagType[] | undefined;
            persist: boolean;
            reset?: boolean | undefined;
        };
        type: string;
    }) => void;
    editFeature: (state: import("immer/dist/internal").WritableDraft<FeatureFlagState>, action: PayloadAction<FlagType>) => void;
    resetFeatures: (state: import("immer/dist/internal").WritableDraft<FeatureFlagState>) => void;
}, "featureflag">;
export declare const loadFeatureFlagsRedux: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    features: FlagType[];
    overrides?: FlagType[] | undefined;
    persist: boolean;
    reset?: boolean | undefined;
}, string>, editFeature: import("@reduxjs/toolkit").ActionCreatorWithPayload<FlagType, string>, resetFeatures: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>;
declare const _default: import("redux").Reducer<FeatureFlagState, import("redux").AnyAction>;
export default _default;
