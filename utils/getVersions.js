/* eslint-disable @typescript-eslint/no-var-requires */
// Creates a version file that can be called

const path = require('path');
const fs = require('fs');

const packagedata = fs.readFileSync('package.json');
const packageJson = JSON.parse(packagedata);

const versions = {
  bootstrap: packageJson.dependencies.bootstrap,
};

fs.writeFileSync(
  path.join(__dirname, '../public/versions.json'),
  JSON.stringify(versions)
);

// eslint-disable-next-line no-console
console.log(
  'Versions page created in: ',
  path.join(__dirname, '../public/versions.json')
);
