/* eslint-disable import/no-extraneous-dependencies */
/*
This file creates the redux store.
There normally isn't a need to modify this file
*/

import { createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};
let exportReducer = rootReducer;

if (process.env.REACT_APP_USE_LOCAL_STORAGE === 'true') {
  // @ts-ignore
  exportReducer = persistReducer(persistConfig, rootReducer);
}
const exportCreateStore = () => createStore(exportReducer);

export default exportCreateStore;
