/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from '@reduxjs/toolkit';

import { featureFlagsReducers } from '../../components';

export default combineReducers({ FeatureFlags: featureFlagsReducers });
