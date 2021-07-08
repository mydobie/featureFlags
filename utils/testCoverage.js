// Reports back code coverage.
// This is normally used as part of a pre-pr type of check like in a Jenkinsfile
// It is not used by the React application

/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const minimumLinesCoveredPercent = 75; // CHANGE ME to the minimum acceptable percentage of lines covered.

try {
  const json = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../coverage/coverage-summary.json')
    )
  );

  console.log('Coverage Summary: ');
  console.log(json.total);

  if (json.total.lines.pct < minimumLinesCoveredPercent) {
    console.log('******************\n');
    console.log(
      `Minimum coverage of ${minimumLinesCoveredPercent}% of lines covered was not met.`
    );
    console.log('\n******************');
    process.exitCode = 1;
  } else {
    process.exitCode = 0;
  }
} catch (e) {
  console.log('******************\n');
  console.log('Cannot get test coverage report');
  console.log('\n******************');
  process.exitCode = 1;
}
