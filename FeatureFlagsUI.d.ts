import { ReactElement } from 'react';
declare type CoreUIType = {
    onFeatureChange?: (id: string, checked: boolean) => void;
    onFeatureReset?: () => void;
    readonly?: boolean;
    notDefaultIndicator?: ReactElement;
};
declare const CoreUI: ({ onFeatureChange, onFeatureReset, readonly, notDefaultIndicator, }: CoreUIType) => ReactElement;
export default CoreUI;
