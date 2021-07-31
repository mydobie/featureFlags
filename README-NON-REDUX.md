# Using Feature Flags using local storage

The settings for each feature flag are stored in local storage so the value is available across the application. This is helpful for applications that do not use Redux.

## Requirements

In order to use these components, you need to ensure that the following are in your package.json file and installed.

- react
- react-dom

---

## Loading flags

The first step is to load the feature flags into the application. This function should be called as soon as the application is rendered (usually contained in App.jsx or App.tsx)

```
import { loadFeatureFlags, } from '@mydobie/feature-flags';

loadFeatureFlags( {
      features: myFlagJSONArray,
      overrides: [{ id='FRUITS', active: true}],
      persist: true,
    } )

```

Where:

- features is an array of feature flag objects
- overrides: (optional) array of feature flag objects that will override items in the features array.
- persist: (optional defaults false) feature flag "action" settings persists across page refreshes.

---

### Checking feature status

The `isFeatureActive` function can be called. The first parameter that is the feature flag id and returns a boolean.

```
import { isFeatureActive } from '@mydobie/feature-flags';

const isMyFeatureActive isFeatureActive(myFeatureId)

```

---

### Feature flag UI

If you want to allow users to modify the value of the feature flags, there are components that can be included in your application.

Component: `FeatureFlagsUI`

Props:

- onFeatureChange. Function called when any feature changes.

Example:

```
import { FeatureFlagsUI } from @mydobie/feature-flags

...

return <FeatureFlagsUI onFeatureChange={(featureArray)=>{ /* callbacks */}} />

```