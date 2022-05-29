# Using Feature Flags in a Redux app

## Requirements

In order to use these components, you need to ensure that the following are in your package.json file and installed.

- react
- react-dom
- immer
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
loadFeatureFlagsRedux(
  {
    features: Array of feature flags - see "Feature Flag data" in main README
    overrides: Array of feature flags - (optional) Array of feature flags that should overwrite any item in the features array
    persist: Boolean - (optional) if true, the feature flags will be persisted across page loads (not recommended)
  }
)
```

**Example:**

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

---

## Checking feature status

There are two ways to check if a feature is active.

### useIsFeatureActive hook

The `useIsFeatureActive` hook will return a boolean if the feature is active.

The only parameter that is the feature flag id.

**Example:**

```
import { useIsFeatureActive } from '@mydobie/feature-flags/redux';

const isMyFeatureActive =  useIsFeatureActive(myFeatureId);

```

### useFeatureFlagged hook

The `useFeatureFlagged` hook will return a provided item if the feature is active or a provided fallback item (if provided) if the feature is not active. If the feature is not active and no fallback item is provided, the hook will return null.

```
useFeatureFlagged(
  featureFlagId: string,
  component: ReactComponent - component shown if feature flag is active
  fallback: ReactComponent - (optional) component shown if feature flag is not active.  Will return null if not provided.
)
```

import { useFeatureFlagged } from '@mydobie/feature-flags/redux';

const message = useFeatureFlagged(myFeatureId, (<p>Hello world</p>));

Note that this application assumes that the reducer key in `combineReducers` is set to 'FeatureFlags'. If it was set to something else, they key can be passed as the last parameter in either the `useIsFeatureActive` or `useFeatureFlagged` hooks.

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

return <FeatureFlagsReduxUI onFeatureChange={(flagId, isActive)=>{ /_ other code _/ }} onFeatureReset={()=>{ /_ other code _/ }} />

```

```

```
