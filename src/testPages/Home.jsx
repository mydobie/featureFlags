// NOTE This is a sample page and should either be
// modified or removed from a real project

import React from 'react';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import FeatureFlagsUI from '../Components/FeatureFlagsUI';
import FeatureFlagsReduxUI from '../Components/FeatureFlagsReduxUI';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <h1>Feature Flags</h1>
              <p>
                These are the testing pages to play with feature flags module.
                Use the links above to change the feature flag settings.
              </p>
            </Jumbotron>
            <div>
              <h2>Local storage based (read-only):</h2>
              <FeatureFlagsUI readonly />
            </div>
            <div>
              <h2>Redux based (read-only):</h2>
              <FeatureFlagsReduxUI readonly />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

Home.propTypes = {};
Home.defaultProps = {};
