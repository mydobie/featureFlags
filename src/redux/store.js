/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-extraneous-dependencies */
/*
This file creates the redux store. 
There normally isn't a need to modify this file
*/

import { createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

let exportCreateStore = createStore(
  rootReducer,
  // composeWithDevTools(applyMiddleware(thunk))
  composeWithDevTools()
);

if (process.env.REACT_APP_USE_LOCAL_STORAGE === 'true') {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  exportCreateStore = () =>
    // createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
    createStore(persistedReducer, composeWithDevTools());
}
export default exportCreateStore;
