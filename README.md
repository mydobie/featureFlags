# Feature flags

## Description:

This simple package allows you mark itesm as feature flags and then set the availablity of those items through configuration. In addition there is a UI to change feature flags.

This package can be used in any React application.

[See a feature flags in action](https://mydobie.github.io/featureFlags/)

---

## Getting Started - Adding this component to your project

There are three methods of including this into your project.

### Method 1 create and use tgz file

1.  Clone this project.
1.  Run `npm run buildPackage` to build and tar the component.

The above steps will create a `.tgz` file in the root of this project. Move this `.tgz` file into your project. Add the path to the`.tgz` file to your `package.json` file:

```
dependencies: {
  "@mydobie/feature-flags": "file:./path_to_tgz_file.tgz",
}
```

Then run `npm install`.

### Method 2 download tgz file from GitHub

1. Go to the [package page](https://github.com/mydobie/featureFlags/packages?ecosystem=npm) for this project and download the wanted version of the `.tgz` file.
1. Save the downloaded `.tgz` file into your project.
1. Add the path to the`.tgz` file to your `package.json` file:

```
dependencies: {
  "@mydobie/feature-flags": "file:./path_to_tgz_file.tgz",
}
```

Then run `npm install`.

### Method 3 use GitHubs npm repository

Instead of creating or downloading the `.tgz` file, you can have NPM pull this module as if it were any other module. This process has been documented in the [README_GITHUB](README_GITHUB.md) file.

---

## Notes

This package is not optimized to be used direclty in the browser. It must included in an application that has a build process like using [Webpack](https://webpack.js.org/) for example. Webpack and the build command is built into applications based on [create react app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app).

This application can be used in Javascript and Typescript based applications.

---

## CSS

The UI component to change feature flags is configured to use the Bootstrap CSS for styling. The CSS is available at the [Bootstrap CDN](https://www.bootstrapcdn.com/) or by downloading the [Bootstrap SCSS.](https://getbootstrap.com/docs/5.0/getting-started/download/). Note that both Bootstrap 4 and 5 are supported.

---

## Feature Flag data

The initial feature settings are loaded as a JSON object in this format:

```
const myFlagJSONArray = [
  {
    id: 'FRUITS',
    active: false,
    description: 'Fruit list',
  },
  {
    id: 'VEGGIES',
    active: true,
    description: 'Vegetable list',
  },
];
```

### Typescript

There is a ` FlagType` type available.

```
import { FlagType } from '@mydobie/feature-flags';
let myFlagJSONArray: FlagType[]

```

---

## Using feature flags in your application

If you are using Redux, see [README-REDUX.md](README-REDUX.md) on how to use feature flags with Redux

If you aren't using Redux, see [README-NON-REDUX.md](README-NON-REDUX.md) on how to use feature flags with local storage.

---

---

---

# Developing

The following sections describe how perform development on this component(s).

## Get me started:

At the root of the project run the following commands in a terminal to verify you can perform all the development tasks:

1.  Verify node is installed => `node -v`. Ensure that it is version listed in the `engines` section of the `package.json` file.
1.  Install dependencies => `npm run i`
1.  Verify you can check for lint errors => `npm run lint`
1.  Verify you can run the tests => `npm run test`
1.  Verify you can check for security advisories => `npm run npmAudit`
1.  Start dev server to view demo files => `npm run start` then go to [http://localhost:3000](http://localhost:3000)
1.  Verify you can build the package => `npm run buildPackage`
1.  Verify you can build the demo files => `npm run build`

---

## Project structure

All of the files that will be bundled into the package are located in the `src/compnent` directory. All other files in the `src` directory are demo pages so you can see see the feature flags in a browser during development.

---

## Node

The only requirement is that development system has Node.js installed. You can verify you have node installed by running `node -v` in a terminal.

NOTE: The development tools require a node version listed in the `engines` section of the `package.json` file.

If have an different version of node running, first verify if you have NVM installed by running `nvm --version` in a terminal. If you do have NVM running, then see the [NVM website](https://github.com/nvm-sh/nvm) on how to install and use a new version of Node.

If you don't have Node nor NVM installed, see the [NodeJS website](https://nodejs.org/en/) on how to install Node.

Alternatively you can choose to develop this application inside a Docker container instead of modifying the version of node or NVM on your machine. See the `DOCKER_DEV_ENV/README.md` file for more information.

## Install dependencies

After checking out the project, run `npm i` in a terminal at the root of the project to install dependencies.

After installing dependencies, you can check to see what dependencies are out of date by running `npm outdated` in a terminal at the root of the project.

## Check security stats of dependencies

You can check if there is any high or critical security advisories for installed dependencies by running `npm run npmAudit`.

This application uses [Husky](https://github.com/typicode/husky) to automatically install Git Hooks that will check for security advisories at commit time. Commits will fail if any dependency has a high or critical security advisory. See the `husky` section in the `package.json` file. This means that you cannot commit code until high or critical security advisories are resolved. This was done intentionally because resolving high or critical security advisories is always the highest priority.

## Start the development server

To start the development server, run `npm run start` in a terminal at the root of the project.

This will start the application in development mode and open the application in a browser. Note the application will not build if there are any linting errors.

The application wil be available at [http://localhost:3000](http://localhost:3000) in a browser.

If you need to change the port the application is running on, then change the `PORT` value in the `.env` file.

### Run tests

To run the tests, run `npm run test` in a terminal the root of the project. This will run all of the tests in the `src/__tests__` directory.

After running tests, you can check the coverage reports by opening `coverage/index.html` in a browser or by running `npm run checkCoverage` in a terminal for a summary.

If you prefer, you can have the testing run in "watch" mode by running `npm run test:watch` in a terminal at the root of the project. The tests will be rerun as you make edits. Note coverage reports will not be updated while in watch mode.

Test are run in [Jest](https://jestjs.io/docs/en/expect), use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to inspect components, and [jest-axe](https://github.com/nickcolley/jest-axe) to check for accessibility.

### Linting

You can check the linting status of your files by running `npm run lint` in a terminal at the root of the project.

To fix known issue, you can run `npm run lint:fix`. NOTE: You may need to run this command multiple times until you get a successful run in order to fix all issues.

If you want linting issues fixed as you save files, run `npm run lint:watch` in a terminal at the root of the project.

More information on fixing linting errors is available at: [esLint](https://eslint.org/docs/rules/) | [Prettier](https://prettier.io/docs/en/install.html) |[airbnb JS style guide](https://github.com/airbnb/javascript)

This application uses [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) to automatically install Git Hooks that will check for linting errors on files at commit time. All linting errors must be fixed before changes can be committed to git.

### Build package

To build and create a tar file that can be imported in other projects, run `npm run buildPackage`. Note that GitHub actions will automatically run this command and upload the package to GitHub packages when a PR is merged into the main branch.

## Build demo files

This project contains demo files you can see the feature flags in action in order to assist with development. To build the demo files, run `npm run build` and the demo files will be located in the 'build' directory. Note that GitHub actions will automatically run this command and upload the contents to gh-pages branch when a PR is merged into the main branch.
