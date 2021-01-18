// Page rendered when url doesn't match route in App.jsx

import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const FourOhFour = (/* props */) => (
  <Container>
    <Row>
      <Col>
        <h1>Page not found</h1>
        <p>The page you requested could not be found.</p>
      </Col>
    </Row>
  </Container>
);

export default FourOhFour;
