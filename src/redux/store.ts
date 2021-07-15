/* eslint-disable import/no-extraneous-dependencies */
import {
  configureStore,
  ThunkAction,
  Action,
  // combineReducers,
} from '@reduxjs/toolkit';

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
// import FeatureFlags from '../components/featureFlagsReducers';

import rootReducer from './reducers/index';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const usePersister = process.env.REACT_APP_USE_LOCAL_STORAGE === 'true';

// const rootReducer = combineReducers({ FeatureFlags });

const persistedReducer = usePersister
  ? persistReducer(persistConfig, rootReducer)
  : rootReducer;

export const store = configureStore({
  // @ts-ignore
  reducer: persistedReducer,
  // @ts-ignore
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState =
  | ReturnType<typeof rootReducer>
  | ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
