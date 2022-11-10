module.exports = {
  'src/**/*.{ts,tsx,js,jsx}': [
    (jsFiles) => jsFiles.map((jsFile) => `npx eslint ${jsFile}`), // check files
  ],
  'src/**/*.{js,jsx,ts,tsx,css,scss,md,json,html}': [
    (htmlFiles) =>
      htmlFiles.map(
        (htmlFile) =>
          `npx prettier --ignore-path ./.eslintignore --write  ${htmlFile}`
      ), // check files
  ],
};
