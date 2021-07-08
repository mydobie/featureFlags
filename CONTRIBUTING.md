# Contributing to the project

## How to commit changes

This application uses a modified version of GitHub flow. All code moved to a server must be contained in a release. All releases must be made from the master branch. The head of the master branch will contain the latest deployable code. Note that the head of master branch may contain code that is on a test/qa/staging and/or production environment. Master is not tied to an application instance. (test/qa/staging, production)

1. When starting work toward a new release, branch off the master branch or a known release (aka tag) for retrofits.
1. If there will be multiple persons working or multiple features on the new release, then create branches of the new release branch.
1. As the last commit on the release branch, change the version in the `package.json` file and run `npm i` to update the `package-lock.json` file. Note: do not tag or create a version yet.
1. Submit for pull request into the master branch.
   1. Reviewers should ensure that the version has been updated and does not match an existing release tag
1. Once approved by at least 2 approvers, merge or squash merge the pull request
1. Delete the release branch and all "child" branches
1. Create a release tag in GitHub using the following templates described below.
1. After Jenkins and/or GitHub Actions has finished, verify that a GitHub release has been created and there is a new corresponding artifact in Artifactory and/or GitHub packages. If not manually create the GitHub release off the master branch and upload the artifact.

### Releases

The GitHub releases are used by both developers and business owners, the release notes should be fairly detailed.

The tag for the release should start with a `v` and then have the version number as specified in the `package.json` file. For example: `v1.1.0`

Release title should contain the version and a short summary description. For example: `Version 1.1.0 - Accessibility fixes`

The release body contains a description along with lists of items added, removed and modified. For example:

```
This release adds the ability for users to add and upload images.

Additions:
  - New image component (#103)
  - Display error when ajax to get fuzzy bunny information fails(#104)
  - Alternative text on all images (#102)

Removals:
  - Basic.css file as the file was not needed in the project (#103)
  - "How to" text on the select box (#105)

Changes:
  - Updated Readme
```

---

## Testing

A test driven development (TDD) should be used when building react components. This means writing a test for a component before it is built. This will encourage wider code coverage and reduction on the dependance on snapshot tests.

For every `.js `or `.jsx` file, there should be a corresponding test file in the directory in the `/src/__tests__` directory. This ensures that if a component is moved to another application, all the tests testing that component can also be easily moved.

If at all possible snapshot tests (where results are compared to a previous run's html) should be avoided. While they can be helpful early in development, they should be replaced with more detailed tests later on.

Text matching tests should be avoided.

Because of the nature of the Node, Jest, React, Redux and Enzyme environment, a very high level of test coverage (at least 85% lines covered) is expected.

---

## Code formatting

While both Eslint and Prettier enforce strict coding practices, there are numerous code styles that aren't caught by the linters or formatters.

### Naming

All files, class names, function/method, and variable names are camel case. Class names and component file names start with a capital letters.

#### Exceptions to naming rules

- GitHub recognized files like README.md, CONTRIBUTING.md, and LICENSE.md. These file names are all capitals.
- "Magic" folders that are used during testing are named starting and ending with "\_\_"
- Global static variables (commonly called enums in other languages) are all caps and snake case.

### If statements

For simple if/else statements use a ternary expression:

```
NOT:
if( myvar === 'foo'){
  myothervar = 'foo';
} else {
  myothervar = 'not foo';
}

YES:
myothervar = myvar === 'foo'? 'foo' : 'not foo';

```

Do not nest ternary expressions.

Always use `{}` after if statements:

```
NOT:
if (myvar === 'foo') myothervar = 'foo';

YES:
if( myvar === 'foo'){
  myothervar = 'foo';
}
```

When ever possible, use a `switch` statement instead of series of if statements.

### Returning early (escape condition)

In a method, call return as soon as possible instead of having an application run through the rest of the code.

```
YES:
if (myvar === null){
  return;
}
...
```

### Use of ternary expressions for react conditional display

```
NOT:
{loading === true && <Loading />}

YES:
{loading === true ? <Loading /> : null}
```

### SCSS

CSS for individual items should be saved inside the component itself. This can be done as inline CSS or use styled-components (recommended). If there is a lot of custom css needed for a component, then a separate scss file can be crated and imported.

Only application-wide styles should be added to the `src/scss` files

### Do not override linting

Overriding linting rules should be kept to an absolute minimum. Under normal coding situations there isn't a need to make exceptions to the linting rules. If you find yourself doing this, please reconsider what you are doing. All linting overriding statements should be reviewed and approved by the team after careful review

### Use native Javascript array methods instead of loops

Javascript provides a great assortment of [array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). These methods should be used instead of brute force loops:

```
NOT:
const myNewArray = [];
const myOldArray = ['red', 'green', 'blue'];
for (let i = 0; i < myOldArray.length; i++) {
  myNewArray.push(`The color ${myOldArray[i]}`);
}

YES:
const myOldArray = ['red', 'green', 'blue'];
const myNewArray = myOldArray.map((color) => `The color ${color}`);

```

### When possible use async/await promises instead of callbacks

While some modules and coding situations require the use of call backs, when possible use async/await or promises when possible.

```
NO:
const myFunction = (callback) => {
  axios
    .get('myURL')
    .then((response) => {
      callback(null, response);
    })
    .catch((error) => {
      callback(error);
    });
};



YES:
const myFunction = async () => {
  try{
    return await axios.get('myURL')
  }
  catch(error){
    return error
  }
};

```
