// Page rendered when url doesn't match route in App.jsx

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import notFoundImage from '../images/page_not_found.svg';

const FourOhFour = (/* props */) => (
  <Container>
    <Row>
      <Col>
        <h1>Page not found</h1>
        <p>The page you requested could not be found.</p>
        {/* EXAMPLE: Inline CSS styles */}
        <p style={{ textAlign: 'center' }}>
          <img src={notFoundImage} className='App-logo' alt='' />
        </p>
      </Col>
    </Row>
  </Container>
);

export default FourOhFour;
