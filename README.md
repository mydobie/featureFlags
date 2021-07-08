# simple-react-app

This file contains boilerplate text for the start of a README.

Directions on how create a new app using the files in this project are located in GETTING_STARTED/README.md file.

---

## Description:

CHANGE ME => Brief description of what this application does.

## Get me started:

At the root of the project run the following commands in a terminal to verify you can perform all the development tasks:

1.  Verify node is installed => `node -v`. Ensure that it is version listed in the `engines` section of the `package.json` file.
1.  Install dependencies => `npm run d`
1.  Verify you can check for lint errors => `npm run lint`
1.  Verify you can run the tests => `npm run test`
1.  Verify you can check for security advisories => `npm run npmAudit`
1.  Start dev server using mocked data => `npm run start:mock` then go to [http://localhost:3000](http://localhost:3000)
1.  Verify you can build production files => `npm run build`
1.  Verify you can make tar for deployment => `npm run createTar`

## Node

The only requirement is that development system has Node.js installed. You can verify you have node installed by running `node -v` in a terminal.

NOTE: The development tools require a node version listed in the `engines` section of the `package.json` file.

If have an different version of node running, first verify if you have NVM installed by running `nvm --version` in a terminal. If you do have NVM running, then see the [NVM website](https://github.com/nvm-sh/nvm) on how to install and use a new version of Node.

If you don't have Node nor NVM installed, see the [NodeJS website](https://nodejs.org/en/) on how to install Node.

Alternatively you can choose to develop this application inside a Docker container instead of modifying the version of node or NVM on your machine. See the `DOCKER_DEV_ENV/README.md` file for more information. This is the recommended method for development.

## Install dependencies

After checking out the project, run `npm run d` in a terminal at the root of the project to install dependencies.

After installing dependencies, you can check to see what dependencies are out of date by running `npm outdated` in a terminal at the root of the project.

## Check security stats of dependencies

You can check if there is any high or critical security advisories for installed dependencies by running `npm run npmAudit`.

This application uses [Husky](https://github.com/typicode/husky) to automatically install Git Hooks that will check for security advisories at commit time. Commits will fail if any dependency has a high or critical security advisory. See the `husky` section in the `package.json` file. This means that you cannot commit code until high or critical security advisories are resolved. This was done intentionally because resolving high or critical security advisories is always the highest priority.

## Start the development server

To start the development server with mocked data, run `npm run start:mock` in a terminal at the root of the project. If you want to run the application making real API calls, run `npm run start`.

This will start the application in development mode and open the application in a browser. Note the application will not build if there are any linting errors.

The application wil be available at [http://localhost:3000](http://localhost:3000) in a browser.

If you need to change the port the application is running on, then change the `PORT` value in the `.env` file. This `PORT` value is only used for the development server and will not impact a production or production-like (like staging) environment.

#### Known warnings

While starting up the development server, some known warnings or errors may be displayed. Please see the `Build/Known warnings` section below.

### Run tests

To run the tests, run `npm run test` in a terminal the root of the project. This will run all of the tests in the `src/__tests__` directory.

After running tests, you can check the coverage reports by opening `coverage/index.html` in a browser or by running `npm run checkCoverage` in a terminal.

If you prefer, you can have the testing run in "watch" mode by running `npm run test:watch` in a terminal at the root of the project. The tests will be rerun as you make edits. Note coverage reports will not be updated while in watch mode.

Test are run in [Jest](https://jestjs.io/docs/en/expect), use [Enzyme](https://enzymejs.github.io/enzyme/) to inspect components, and [jest-axe](https://github.com/nickcolley/jest-axe) to check for accessibility.

#### Snapshot tests

This application may use snapshot tests. If there is any change to the HTML, there may be a need to update the snapshot files. This can be done by running `npm run test:update` in a terminal window.

NOTE: Generally snapshots are not recommended, but are a good start when more detailed tests aren't possible or feasible.

### Linting

You can check the linting status of your files by running `npm run lint` in a terminal at the root of the project.

To fix known issue, you can run `npm run lint:fix`. NOTE: You may need to run this command multiple times until you get a successful run in order to fix all issues.

If you want linting issues fixed as you save files, run `npm run lint:watch` in a terminal at the root of the project.

More information on fixing linting errors is available at: [esLint](https://eslint.org/docs/rules/) | [Prettier](https://prettier.io/docs/en/install.html) |[airbnb JS style guide](https://github.com/airbnb/javascript)

This application uses [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) to automatically install Git Hooks that will check for linting errors on files at commit time. All linting errors must be fixed before changes can be committed to git.

### Build

Normally a tar file with the build (production-ready) files needs to be created so it can be loaded to an artifact repository like Artifactory. To build and create a tar file of the built files run `npm run createTar`

If you want to create the build (production-ready) without creating a tar file, run `npm run build` in a terminal at the root fo the project. This will create production-ready files in a `build` directory.

#### Known warnings

If you get a `Node Sass could not find a binding for your current environment` error, it means that the SASS compiler wasn't downloaded for your node version and OS. Run `npm run d` to ensure that the correct version of the compiler is downloaded.

If the application has feature flags enabled, a harmless `Module not found: Can't resolve ... ` warnings will be shown and they can be ignored. These warnings will not prevent the build from happening nor will it impact the application. It is currently a known issue with the feature flags module.

---

#### Deploying

The process to deploy an artifact (aka tar file) to a server is not handled by this application, Jenkinsfile, nor GitHub action file.

Some other process will need to pull the artifact from Artifactory, and untar the files. This could be Ansible, Chef, or even done manually.

---

### Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Local modules

This application uses a couple of modules that are not available via an NPM registry yet.

- [feature_flags](https://github.com/mydobie/featureFlags)
