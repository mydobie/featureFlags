/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from 'redux';

import { featureFlagsReducers } from '../../components/redux';

export default combineReducers({ FeatureFlags: featureFlagsReducers });
