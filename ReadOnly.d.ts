import { ReactElement } from 'react';
import { FlagType } from './index';
declare type ReadOnlyType = {
    features: FlagType[];
    notDefaultIndicator?: ReactElement;
};
declare const ReadOnly: ({ features, notDefaultIndicator }: ReadOnlyType) => JSX.Element;
export default ReadOnly;
