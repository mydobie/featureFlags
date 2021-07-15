// Page rendered when url doesn't match route in App.jsx

import React from 'react';

import notFoundImage from '../images/page_not_found.svg';

const FourOhFour = (/* props */) => (
  <div className='container'>
    <h1>Page not found</h1>
    <p>The page you requested could not be found.</p>
    {/* EXAMPLE: Inline CSS styles */}
    <p style={{ textAlign: 'center' }}>
      <img src={notFoundImage} className='App-logo' alt='' />
    </p>
  </div>
);

export default FourOhFour;
