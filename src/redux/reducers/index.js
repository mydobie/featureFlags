/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers } from 'redux';
import { reducerFeatureFlags } from '../../Components/featureFlags';

// Import each reducer and then add it to the object param of combineReducers.

export default combineReducers({ reducerFeatureFlags });
