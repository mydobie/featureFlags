# Contributing to the project

## How to commit changes

1. When starting work toward a new release, branch off the `main` branch or a known release for retrofits.
1. Submit for pull request any changes into the main branch.
1. Once approved the approvers will squash merge the pull request
1. Delete the release branch and all "child" branches
1. After GitHub Actions has finished, verify that a GitHub release has been created and there is a new corresponding GitHub package.
1. Update the release description in GitHub

### Versioning

The version in the `package.json` file updates automatically when merged into the `main` branch.

The new version is determined by the pull request merge commit message:

- If the string "BREAKING CHANGE" or "major" is found anywhere in any of the commit messages or descriptions the major version will be incremented.
- If the string "feat" or "minor" is found anywhere in any of the commit messages or descriptions the minor version will be incremented.
- All else, the patch version will be incremented.

See [gh-action-bump-version](https://github.com/phips28/gh-action-bump-version) for more information.

### Releases

It is necessary to update the release description and notes in GitHub after GitHub actions have been run.

Release title should contain the version and a short summary description. For example: `Version 2.1.0 - Accessibility fixes`

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

The goal of testing to test the component how the user would test it in the browser. This means that private methods or components that are only consumed by other components do not need test directly testing those items. See [React testing library](https://testing-library.com/docs/react-testing-library/intro/#the-problem.)

Tests should be saved in the `/src/__tests__` directory.

If at all possible snapshot tests (where results are compared to a previous run's html) should be avoided.

Text matching tests should be avoided, the use of [testIds](https://testing-library.com/docs/queries/bytestid/) is preferred.

Because of the nature of the Node, Jest, React, and Redux environment, a very high level of test coverage (at least 85% lines covered) is expected.

---

## TypeScript

TypeScript will be used inside of the `src` folder.

### React functional components only

Class based components should not used. All react components should be functions and use hooks to maintain state.

## Code formatting

While both Eslint and Prettier enforce strict coding practices, there are numerous code styles that aren't caught by the linters or formatters.

### Naming

All files, class names, function/method, and variable names are camel case. Class names and component file names start with a capital letters.

#### Exceptions to naming rules

- GitHub recognized files like README.md, CONTRIBUTING.md, and LICENSE.md. These file names are all capitals.
- "Magic" folders that are used during testing are named starting and ending with `__`
- Global static variables are all caps and snake case.

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

Custom CSS should not be used in this application. Instead, Bootstrap classes should be used.

### Do not override linting or TypeScript rules

Overriding linting or TypeScript rules should be kept to an absolute minimum. Under normal coding situations there isn't a need to make exceptions to the rules. If you find yourself doing this, please reconsider what you are doing. All override statements will be reviewed as part of the pull request process.

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
