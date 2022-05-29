# Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/download) or VSC is highly recommended because it was built for working with nodejs-based development tools used in most React development work.

## Extensions

In addition to the base install, there are numerous extensions that will help working with React based applications easier:

- [Code Spell Check](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Formatting Toggle](https://marketplace.visualstudio.com/items?itemName=tombonnike.vscode-status-bar-format-toggle)
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [NPM Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

---

## Linting

VSC can be configure to highlight linting issues and fix linting issues on file save. VSC will use the linting rules saved in this project.

1.  To turn on the lint on save:
1.  In VSC, go to `Code > Preferences > Settings`.
1.  Open the `Text Editor` section
1.  Click on `Formatting`
1.  Check the `Format on Save` section
1.  Install the Prettier extension (see link above)
1.  Install the ESLint extension (see link above)
1.  At the very of the VSC window, click on the red `ESLINT` text
1.  Click on "Allow"

The above steps will install all the pieces, but VSC needs to be told to use Prettier to reformat on save.

1.  Open any `.tsx` file
1.  Press `command` + `shift` + `p`
1.  Select `Format Document`
1.  Click on the `Configure` button
1.  Select `Prettier ...`

Now when you make a change and save any `.tsx` file, it should format on save. Repeat the above process for other file types including `.ts`, `.js` and `.html` files.

---

## Running tests

VSC can be set up to run all tests when any file changes.

1.  Create a `.vscode` directory if it doesn't exist at the root of the project
1.  Copy the `settings.json` and `launch.json` files into the `.vscode` directory
1.  Install the `Jest` extension (see link above)
1.  The results of the tests will be displayed in the test file and at the bottom of the VSC window.
