import { ReactElement } from 'react';
import { FlagType } from './featureFlags';
declare type ReadOnlyType = {
    features: FlagType[];
    notDefaultIndicator?: ReactElement;
};
declare const ReadOnly: ({ features, notDefaultIndicator }: ReadOnlyType) => JSX.Element;
export default ReadOnly;
