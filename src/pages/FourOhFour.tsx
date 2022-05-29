// Page rendered when url doesn't match route in App.jsx

import React, { ReactElement } from 'react';

const FourOhFour = (/* props */): ReactElement => (
  <div className='container'>
    <h1>Page not found</h1>
    <p>The page you requested could not be found.</p>
  </div>
);

export default FourOhFour;
