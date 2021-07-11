import { combineReducers } from 'redux';

import FeatureFlags from '../../components/featureFlagsReducers';

export type actionType = {
  type: string;
  payload: any;
};

export default combineReducers({ FeatureFlags });
