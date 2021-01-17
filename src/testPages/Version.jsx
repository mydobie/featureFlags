// Page that shows the application name and version from package.json file
// Along with the git commit.
// Note this file should be used in most applications
// Normally there isn't a need to modify it
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Version = (/* props */) => (
  <Container>
    <Row>
      <Col>
        <h1>Version</h1>
        <ul>
          <li>
            <strong>Application Name:</strong>
            <span id='appNameFromPackageJson'>
              {process.env.REACT_APP_NAME}
            </span>
          </li>
          <li>
            <strong>Version: </strong>
            <span id='appVersionFromPackageJson'>
              {process.env.REACT_APP_VERSION}
            </span>
          </li>
          <li>
            <strong>Git Commit: </strong>
            <span id='gitCommitHash'>{process.env.REACT_APP_GIT_SHA}</span>
          </li>
        </ul>
      </Col>
    </Row>
  </Container>
);

export default Version;
