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
import { loadFeatureFlags, } from '@mydobie/feature-flags/react';

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

## Checking feature status

There are two ways to check if a feature is active.

### isFeatureActive

The `isFeatureActive` function will return a boolean. The first parameter that is the feature flag id.

```
import { isFeatureActive } from '@mydobie/feature-flags/react';

const isMyFeatureActive isFeatureActive(myFeatureId)

```

### featureFlagged

The `featureFlagged` function will return a provided item if the feature is active or a provided fallback item (if provided) if the feature is not active. If the feature is not active and no fallback item is provided, the function will return null.

```
import { featureFlagged } from '@mydobie/feature-flags/react';

const message =  featureFlagged(myFeatureId, (<p>Hello world</p>));

```

### Checking feature status by passing redux store

Both method can be used with redux if you pass the entire store along with the main featureFlag key. This isn't recommended, but might be useful for older class-based functions that use the connect functionality.

Example:

```
import { isFeatureActive, featureFlagged } from '@mydobie/feature-flags/react';

const isMyFeatureActive isFeatureActive(myFeatureId, myStore, 'FeatureFlags');
const message =  featureFlagged(myFeatureId, (<p>Hello world</p>),null, myStore, 'FeatureFlags');

```

NOTE: This method is not recommended and is only provided for backwards compatibility.

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
