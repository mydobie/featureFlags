## Requirements

In order to use these components, you need to ensure that the following are in your package.json file and installed.

- react
- react-dom

---

## Setting provider

This application uses React context to ensure feature data is available to child components. At the highest most parent of the components you want to use feature flags, add the `FeatureFlagProvider` component.

**Component**: `FeatureFlagProvider`

**Props**:

- _features_: (optional) An array of feature flags.
- _persist_: (optional) Changes to feature flags is remembered (via local storage) after page fresh. Use with caution. Not recommended in a production environment

**Example:**

_index.tsx_

```
return (
  <FeatureFlagProvider >
    <App />
  </FeatureFlagProvider>
)
```

If you know the feature flag data, you can pass it to the `FeatureFlagProvider` via the features prop:

```
<FeatureFlagProvider features={[{id:'myFeature', active:true}]}>
    <App />
  </FeatureFlagProvider>
```

## Setting dynamic feature data

If you are fetching the feature flag data dynamically by an API call, you can set the data in any child component of the FeatureFlagProvider by using the `useSetFeatureFlags` hook. This is for the initial load of the feature flags. If you ar editing the active status of a single flag, then use the `useEditFeatureFlag` hook (see below)

**Hook**: useSetFeatureFlags

**Returns**: function to set feature flags where the single parameter is an array of feature flags

**Example:**

_index.tsx_

```
return (
  <FeatureFlagProvider >
    <App />
  </FeatureFlagProvider>
)

```

_App.tsx_

```
const setFeatureFlags = useSetFeatureFlags();
...
setFeatureFlags(my_fetched_feature_flag_data);
```

---

## Checking feature status

There are two ways to check if a feature is active.

### useIsFeatureActive hook

The `useIsFeatureActive` hook will return a boolean. The parameter that is the feature flag id.

**Hook**: useIsFeatureActive

**Parameters**

- Feature Flag Id (required)

**Returns**: True if the feature is active.

**Example**

```
const isActive = useIsFeatureActive('MY_FEATURE_FLAG_ID');

return(
  <>
  {isActive && 'Hello world'}
  </>
)

```

### FeatureFlagged component

The `FeatureFlagged` component will display children if the feature is active.

**Component**: `FeatureFlagged`

**Props**:

- _feature_: (required) The feature flag id
- _isNotActive_: (optional) Boolean if you want the children to show if the feature is NOT active.

**Example:**

```
return(
  <>
  <FeatureFlagged feature='MY_FEATURE_FLAG_ID'>Hello world</FeatureFlagged>
  </>
)

```

If you want to reverse - the children are shown only if the features is not active, you can pass the `isNotActive` prop.

```
return(
  <>
  <FeatureFlagged feature='MY_FEATURE_FLAG_ID' isNotActive>Hello world</FeatureFlagged>
  </>
)
```

---

### Feature flag UI

If you want to allow users to modify the value of the feature flags, there are components that can be included in your application.

Component: `FeatureFlagsUI`

Props:

- _onFeatureChange_ - Function that has two arguments, flagId (string) and isActive (boolean). This function is called when the status of a feature flag changes.

- _onFeatureReset_ - Function that doesn't have arguments. This function is called when the user resets the feature flags back to their original status.

- _readonly_ - Boolean if set to true the feature flags will be readonly and all switches/checkboxes will be disabled.

Example:

```

import { FeatureFlagsUI } from @mydobie/feature-flags/react

...

return <FeatureFlagsUI onFeatureChange={(flagId, isActive)=>{ /_ other code _/ }} onFeatureReset={()=>{ /_ other code _/ }} />

```

<hr />

## Helper methods

### Get feature flags

You can use the `useGetFeatures` hook to get a list of all the feature flags with their current status

**Hook** useGetFeatures

**Returns** Array of feature flags

**Example**

```
const myFeatures = useGetFeatures();
```

### Edit feature flag

You can use the `useEditFeatureFlag` hook to edit the active state of any feature.

**Hook** useEditFeatureFlag

**Returns** A function that can be called to edit a feature. There are two parameters to this function: feature flag id, and new is active status

**Example**

```
const editFeatureFlag = useEditFeatureFlag();
...

editFeatureFlag('my_feature_id', true)
```

### Reset all feature flags

You can use the `useResetFeatureFlags` to reset all features flags to their original active setting.

**Hook** useResetFeatureFlags

**Returns** A function that can be called to reset all feature flags.

**Example**

```
const resetFeatureFlags = useResetFeatureFlags();
...

resetFeatureFlags();
```

### Combine features with a set of overrides

If you working locally, you might want to override some of the feature flags. In order to assist with this, there is a helper that takes the features, the overrides and returns an array of features.

**Function**: `featuresWithOverrides`

**Parameters**: array of features flags, array of feature overrides

**Returns**: array of feature flags

**Examples**:

```
 const features = [
    { id: 'Feature1', active: false, original: true },
    { id: 'Feature2', active: false, original: true },
  ];

const overRides = [{ id: 'Feature1', active: true }];

const finalFeatures = featuresWithOverrides(features, overRides);

```
