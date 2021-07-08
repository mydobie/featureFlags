# Getting started

This file contains directions on how to modify the files in this project when starting your own project.

## What files are located where

In order to keep the project organized, the project has the following structure:

- `/util` => All helper files not used directly by the the application.
- `/.env` => Global variables available to the application. These variables are set at build time.
- `/modules` => NPM modules that are saved locally because they cannot be downloaded via an NPM repository.
- `/public` => Static files used by the application but not imported. Normally a parent html file and the .ico file
  - `/public/__fixtures__` => Static json files returned during an ajax call when the application is run in "mock" mode. Note: These files are not included in the built version of the application.
- `/src` => All files used by the application and for testing

  - `/src/__mocks__` => Files called instead of a package during the unit tests
  - `/src/__tests__` => Jest test files. Note: there should be a file for each .jsx and .js file inside the `src` directory.
    - `/src/__fixtures__` => Fixture files used during unit tests
  - `/src/components` => Child and leaf components. In larger projects, there maybe sub folders
    - `/src/components/SAMPLE.jsx` => Sample component that can be used as a template.
    - `/src/components/SAMPLE_NO_STATE.jsx` => Simple function component that can be used as a template. This are components that do not hold state. If in doubt use the `SAMPLE.jsx` version.
    - `/src/components/SetAxios.jsx` => File that contains code that is run before and after each ajax call.
  - `/src/images` => All static images called by the components
  - `/src/js` => Any helper .js file used by the application

    - `/src/js/axios.config.js` => Ajax based helper functions
    - `/src/js/helpers.js` => Javascript helpers used across the application
    - `/src/js/whichEnv.js` => Helper methods to determine what environment the application is running in based in url patterns.

  - `/src/pages` => High level components that are called by the router
    - `/src/pages/SAMPLE.jsx` => Sample component that can be used as a template.
  - `/src/scss` => Contains application-wide (aka theming ) scss.
    - `/src/scss/_variables.scss` => Overrides of Bootstrap main variables
    - `/src/scss/_custom.scss` => Custom css rules. Note this should be application-wide rules
    - `/src/scss/index.scss` => List of Bootstrap includes. Disable any scss for Bootstrap features that are not in use
  - `/src/App.jsx` => Contains any items that should be on all "pages" including header and footers
  - `/src/AppNavBar.jsx` => Main navigation bar for the entire application
  - `/src/AppRouteNames.js` => Lists all the routes so they can imported into both the AppRoutes and AppNavBar files.
  - `/src/AppRoutes.jsx` => Contains the routing for the entire application
  - `/src/index.jsx` => File that inserts React application into the HTML. This normally doesn't need to be modified
  - `/src/feature-flags.config.js` => File that contains feature flags and configuration

- `/GETTING_STARTED` => Files on how to get started and set-up a development environment

---

## Changes needed for a new application

In order to make this sample application into a real application, the following steps should be taken.

### Set HTML

In the `public/index.html` file, change the following:

```
<meta
      name="description"
      content="CHANGE ME => Description of application"
    />
```

```
<title>CHANGE ME => Application Title</title>
```

### Set package.json

There are numerous values that need to be modified including:

- name
- description
- version
- engines.node (recommended version of node used to run build)
- dependencies (add packages used by the application)

### Set routing

In `src/AppRoutes.jsx` file, include routing to the components used in the application

In `src/AppNavBar.jsx` file, add items to be included in the main navigation. This usually includes links to items that were added to the routes file.

### Add site-wide elements

Add items like headers and footers that you want on all pages in an application to `src/App.jsx`.

### Disable feature flags if not used

While the use of feature flags are recommended, it doesn't always make sense to to use them. In order to keep size down, remove code that calls the feature flags.

Remove code between the following comments throughout the project:

```
// START FEATURE FLAGS
```

and

```
// END FEATURE FLAGS
```

More information on how to use feature flags is available at the [feature flag repo site](https://github.com/mydobie/featureFlags).

### Update environment url patterns

Add or remove entries in the `environments` array in `/src/js/whichEnv` to match url patterns.

### Set Axios settings

If needed, set code to be run before and/or after an ajax call in `/src/components/SetAxios.jsx`. This can be handy to display global errors.

Add the methods and urls for ajax calls in `js/axios.config.js`.

### Set Bootstrap SCSS

In `/src/scss/index.scss` comment out lines for Bootstrap items that aren't used and remove comments for Bootstrap items that are used.

### Update Main Readme

The main `/README.md` file should be reviewed and updated.

### Removing or renaming sample files

Files and directories that are in all caps and snake case are only to get you started. Normally names for all files and directories that in a React application should be camel case with Components staring with a capital letter. These sample directories can be removed or renamed.

The only exceptions to this rule are the `README.md`, `LICENSE.md `, `CONTRIBUTING.md`, `CODEOWNERS`
files. These files should be modified without changing the file name.
