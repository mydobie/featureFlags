# Using Feature Flags in a Redux app

## Requirements

In order to use these components, you need to ensure that the following are in your package.json file and installed.

- react
- react-dom
- react-redux

---

## Add Reducers

The first step in a redux-based application is to connect the feature flag reducer.

The following example assumes you are using `combineReducers`

```
import { combineReducers } from 'redux';
import { featureFlagsReducers } from '@mydobie/feature-flags/redux';

export default combineReducers({ FeatureFlags: featureFlagsReducers });

```

---

## Loading flags

The first step is to load the feature flags into the application. This function should be dispatched as soon as the application is rendered (usually contained in App.jsx or App.tsx)

```
import { useDispatch } from 'react-redux';
import { loadFeatureFlagsRedux } from '@mydobie/feature-flags/redux';

...
const App = () => {

useDispatch()(
    loadFeatureFlagsRedux({
      features: myFlagJSONArray,
      overrides: [{ id='FRUITS', active: true}],
      persist: true,
    })
  );

...

```

Where:

- features is an array of feature flag objects
- overrides: (optional) array of feature flag objects that will override items in the features array.
- persist: (optional defaults false) is the redux store set to persist across page refreshes and do you flag settings persist across page refreshes

---

## Checking feature status

The `useIsFeatureActive` hook can be called.

The only parameter that is the feature flag id and returns a boolean.

```
import { useIsFeatureActive } from '@mydobie/feature-flags/redux';

const isMyFeatureActive =  useIsFeatureActive(myFeatureId);

```

Note that this application assumes that the reducer key in `combineReducers` is set to 'FeatureFlags'. If it was set to something else, they key can be passed as the third parameter.

---

## Feature flag UI

If you want to allow users to modify the value of the feature flags, there are components that can be included in your application.

Component: `FeatureFlagsReduxUI`

Props:

- _onFeatureChange_ - Function that has two arguments, flagId (string) and isActive (boolean). This function is called when the status of a feature flag changes.

- _onFeatureReset_ - Function that doesn't have arguments. This function is called when the user resets the feature flags back to their original status.

- _readonly_ - Boolean if set to true the feature flags will be readonly and all switches/checkboxes will be disabled.

Example:

```
import { FeatureFlagsReduxUI } from @mydobie/feature-flags/redux

...

return <FeatureFlagsReduxUI  onFeatureChange={(flagId, isActive)=>{ /* other code */ }}  onFeatureReset={()=>{ /* other code */ }} />

```
