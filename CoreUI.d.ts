import { ReactElement } from 'react';
import { FlagType } from './featureFlags';
declare type CoreUIType = {
    features: FlagType[];
    onFeatureClick: (id: string, checked: boolean) => void;
    onFeatureReset: () => void;
    persist?: boolean;
    readonly?: boolean;
};
export declare type FeatureFlagsUIProps = {
    onFeatureChange?: (flagId?: string, isActive?: boolean) => void;
    onFeatureReset?: () => void;
    readonly?: boolean;
};
declare const CoreUI: ({ features, onFeatureClick, onFeatureReset, persist, readonly, }: CoreUIType) => ReactElement;
export default CoreUI;
