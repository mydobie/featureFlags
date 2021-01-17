# Feature Flags

## Description

This allows you to add feature flags to a project. This includes methods to check to see if a feature should be enabled along with a UI to edit feature visibility. This module can support both local storage and redux based projects.

## Getting Started - Adding this component to your project

Until there there is ability to host this on an artifact repository, there is only one way to add this to your project.

### Create and use tgz file

1.  Clone this project.
1.  Run `npm run buildPackage` to build and tar the component.

The above steps will create a `.tgz` file in the root of this project. Move this `.tgz` file into your project. Add the path to the`.tgz` file to your `package.json` file:

```
dependencies: {
  "[[this_module_name]]": "file:/"path_to_tgz_file.tgz",
}
```

Then run `npm install`.

---

## Requirements

In order to use these components, you need to ensure that the following are in your package.json file and installed.

- react
- react-dom
- prop-types
- react-redux (if using redux features of this module) **NOTE:** This will cause an harmless `Module not found` warning during build if react-redux isn't included.
- bootstrap (if using the edit feature flags UI)
- reactstrap (if using the edit feature flags UI) **NOTE:** This will cause an harmless `Module not found` warning during build if reactstrap isn't included.

## Feature flags array

The first step is to load the feature flag data. The feature flags should be in the format of:

```
[
  {
    id: 'FlagID',  // ID used to identify flags
    active: false, // Is this feature active and available to end users
    description: 'Fruit list', // Description of the feature
  },
  ...
]
```

---

---

## Use in a non-Redux app

If redux isn't available, the state of each feature flag will be stored in local storage under the `featureFlags` key.

### Populating local storage

At the root of your project (usually App.js), you need to load features using the `loadFeatureFlags` method.

Secondly you need function that will re-render the application (without a reload) to be called when a feature flag changes.

```
import {loadFeatureFlags} from 'feature-flags';

// featureFlagArray ... see "Feature flags array" section above

class App extends React.Component{
  componentDidMount() {
    loadFeatureFlags(featureFlagArray, false, this.reRenderApp());
  }
  reRenderApp() {
    this.forceUpdate();
  }

... component code
}

```

### Determining if a feature should be made available

There is a `isFeatureActive` function available. Pass in the feature id and the function will return true if the feature should be made available and false if not. If the feature flag is unknown, the `isFeatureActive` will return undefined.

Example:

```
import { isFeatureActive } from 'feature-flags';

...

{isFeatureActive('COLORS') ? <MyColorFeatureComponent /> : null}

```

### Calling the UI

If you want to use the available UI, it is recommended that it is added at the root of the project (usuallyApp.js) as a route:

```
import { FeatureFlagsUI } from  'feature-flags';

... router code
<Route path='/local'>
  <FeatureFlagsUI onFeatureChange={this.reRenderApp} readonly={true/false} />
</Route>

```

NOTE: OnFeatureChange returns an updated list of featureFlags. The readonly flag sets the UI should be readonly or not.

---

---

## Use in a Redux app

If redux is available, the state of each feature flag will be stored in the redux store.

### Adding the feature flag reducer

The reducer for the feature flags is included as `reducerFeatureFlags` and should be included in your combined reducer.

```
import { combineReducers } from 'redux';
import { reducerFeatureFlags } from 'feature-flags';

export default combineReducers({ reducerFeatureFlags });

```

### Populating redux store

At the root of your project (usually App.js), you need to load features using the `loadFeatureFlags` action.

```
import {loadFeatureFlags} from 'feature-flags';

// featureFlagArray ... see "Feature flags array" section above

class App extends React.Component{
  componentDidMount() {
    loadFeatureFlags(featureFlagArray);
  }

... component code

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  loadFeatureToRedux: (features) => dispatch(loadFeatureFlags(features, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
}

```

### Getting a list of features from store

You can get the array of feature flags from the redux store by using the `getFeatures` selector.

```
const mapStateToProps = (state) => ({
  features: getFeatures(state),
});

```

### Determining if a feature should be made available

There is a `isFeatureActive` function available. Pass in the feature id along with the feature flag array (see above section) and the function will return true if the feature should be made available and false if not. If the feature flag is unknown, the `isFeatureActive` will return undefined.

Example:

```
import { isFeatureActive } from 'feature-flags';

...

{isFeatureActive('COLORS', features) ? <MyColorFeatureComponent /> : null}

```

### Calling the UI

If you want to use the available UI, it is recommended that it is added at the root of the project (usuallyApp.js) as a route:

```
import { FeatureFlagsReduxUI } from  'feature-flags';

... router code
<Route path='/redux'>
  <FeatureFlagsReduxUI readonly={true/false} />
</Route>

```

NOTE: The readonly flag sets if the UI should be readonly or not.

---

---

---

# Developing

The following sections describe how perform development on this component(s).

## Get me started:

If you are just getting started, perform the following tasks to ensure your environment is ready for development.

1.  Verify node is installed => `node -v`. Ensure that it is the version listed in the `engines` section in the `package.json` file
1.  Install dependencies => `npm run d`
1.  Check for lint errors => `npm run lint`
1.  Tun the tests => `npm run test`
1.  Find security advisories => `npm run npmAudit`
1.  Build production-ready package => `npm run buildPackage`
1.  Start dev server to preview the components => `npm run start` then go to [http://localhost:3000](http://localhost:3000)

## Node

The only requirement is that development system has Node.js installed. You can verify you have node installed by running `node -v` in a terminal.

NOTE: The development tools requires Node 12 or higher.

If have an old version of node running, first verify if you have NVM installed by running `nvm --version` in a terminal. If you do have NVM running, then see the [NVM website](https://github.com/nvm-sh/nvm) on how to install and use a new version of Node.

If you don't have Node nor NVM installed, see the [NodeJS website](https://nodejs.org/en/) on how to install Node.

Alternatively you can choose to develop this application inside a Docker container instead of modifying the version of node or NVM on your machine. See the `DOCKER_DEV_ENV/README.md` file for more information. This is the recommended method for development.

## Install dependencies

After checking out the project, run `npm run d` in a terminal at the root of the project to install dependencies.

After installing dependencies, you can check to see what dependencies are out of date by running `npm outdated` in a terminal at the root of the project.

## Check security stats of dependencies

You can check if there is any high or critical security advisories for installed dependencies by running `npm run npmAudit`.

This application uses [Husky](https://github.com/typicode/husky) to automatically install Git Hooks that will check for security advisories at commit time. Commits will fail if any dependency has a high or critical security advisory. See the `husky` section in the `package.json` file. This means that you cannot commit code until high or critical security advisories are resolved. This was done intentionally because resolving high or critical security advisories is always the highest priority.

## Start the development server

To start the development server, run `npm run start` in a terminal at the root of the project. This will start the application in development node and open the application in a browser. Note the application will not build if there are any linting errors.

The application wil be available at [http://localhost:3000](http://localhost:3000) in a browser.

If you need to change the port the application is running on, then change the `PORT` value in the `.env` file. This `PORT` value is only used for the development server and will not impact a production or production-like (like staging) environment.

#### SASS warning

If, while starting up the development server, you may get a `Node Sass could not find a binding for your current environment` error. This is caused that the SASS compiler wasn't downloaded for your node version and OS. Just run `npm run d` to ensure that the correct version of the compiler is downloaded.

## Tests

To run the tests, run `npm run test` in a terminal the root of the project. This will run all of the tests in the `src/__tests__` directory.

After running tests, you can check the coverage reports by opening `coverage/index.html` in a browser or by running `npm run checkCoverage` in a terminal.

If you prefer, you can have the testing run in "watch" mode by running `npm run test:watch` in a terminal at the root of the project. The tests will be rerun as you make edits. Note coverage reports will not be updated while in watch mode.

Test are run in [Jest](https://jestjs.io/docs/en/expect), use [Enzyme](https://enzymejs.github.io/enzyme/) to inspect Components, and [jest-axe](https://github.com/nickcolley/jest-axe) to check for accessibility.

## Linting

You can check the linting status of your files by running `npm run lint` in a terminal at the root of the project.

To fix known issue, you can run `npm run lint:fix`. NOTE: You may need to run this command multiple times until you get a successful run in order to fix all issues.

If you want linting issues fixed as you save files, run `npm run lint:watch` in a terminal at the root of the project.

More information on fixing linting errors is available at: [esLint](https://eslint.org/docs/rules/) | [Prettier](https://prettier.io/docs/en/install.html) |[airbnb JS style guide](https://github.com/airbnb/javascript)

This application uses [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) to automatically install Git Hooks that will check for linting errors on files at commit time. All linting errors must be fixed before changes can be committed to git.

## Security Audit

You can check for any high or critical known security vulnerabilities in the dependencies by typing `npm run npmAudit`. All known security vulnerabilities will be displayed, but the previous command will fail only if at least one of the issues are ranked "high" or higher.

## Structure of the project

The project is structured like this:

- `public/` => The public contains the shell html pages. There normally isn't a need to add or modify anything in this directory and it is only used for previewing the components while in development.
- `src/`
  - `__tests__/` => Jest test scripts. Add your test scripts here.
  - `Components/` => Contains the component files. Place your new component files here.
    - `index.jsx` => List of component(s) or functions to be made available. This file needs to be edited, see file for directions.
  - `App.jsx` => References to components you want to preview while in development. This file needs to be edited, see file for directions.
  - `index.jsx` => Loads App.jsx into the html page. There normally isn't a need to modify this file.
  - `setupTests.jsx` => Add any scripts you wish to run before tests are started to this file.
- `utils/` => Contains helper node functions that are only used as part of the development or build phases.
