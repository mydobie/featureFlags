/* eslint-disable @typescript-eslint/no-var-requires */
// Creates a version file that can be called

const path = require('path');
const fs = require('fs');

const packagedata = fs.readFileSync('package.json', 'utf8');
const packageJson = JSON.parse(packagedata);

const versions = {
  bootstrap: packageJson.devDependencies.bootstrap,
  'react-redux': packageJson.devDependencies['react-redux'],
  hello: 'world',
};

fs.writeFileSync(
  path.join(__dirname, '../public/versions.json'),
  JSON.stringify(versions)
);
