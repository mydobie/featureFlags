/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const CButton = (props) => {
  const { id, children, color, onClick, ui } = props;

  let CustomElement = <div>The alert component cannot be displayed.</div>;
  let type;

  try {
    // Code to skip to reactstrap
    if (
      (process.env.REACT_APP_USE_UI &&
        process.env.REACT_APP_USE_UI !== 'instructure') ||
      (ui && ui !== 'instructure')
    ) {
      throw 'Purposely skipping Instructure UI and using reactstrap';
    }

    // Import Instructure's component
    require.resolve('@instructure/ui-buttons');
    const { Button } = require('@instructure/ui-buttons');

    CustomElement = Button;
    type = 'instructure';
  } catch (error) {
    try {
      // Import reactstrap's component
      require.resolve('reactstrap');
      const { Button } = require('reactstrap');
      CustomElement = Button; // NOTE: This line is causing propTypes errors in console
      type = 'reactstrap';
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
    }
  }

  const instructure = (
    <CustomElement
      id={id}
      margin='small'
      color={color}
      onClick={(e) => {
        onClick(e);
      }}
    >
      {`${children}`}
    </CustomElement>
  );

  const reactstrap = (
    <CustomElement
      id={id}
      margin='small'
      color={color}
      onClick={(e) => {
        onClick(e);
      }}
    >
      {`${children}`}
    </CustomElement>
  );
  return type === 'instructure' ? instructure : reactstrap;
};

CButton.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.string,
  onClick: PropTypes.func,
  ui: PropTypes.string,
};
CButton.defaultProps = {
  id: 'missingId',
  color: 'success',
  children: 'Button text',
  onClick: (/* event */) => {},
  ui: undefined,
};

export default CButton;
