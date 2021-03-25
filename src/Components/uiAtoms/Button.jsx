/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const CButton = (props) => {
  const { id, children, color, onClick, ui } = props;

  try {
    if (
      (process.env.REACT_APP_USE_UI &&
        process.env.REACT_APP_USE_UI !== 'bootstrap') ||
      (ui && ui !== 'bootstrap')
    ) {
      throw 'Purposely skipping React-Bootstrap';
    }
    require.resolve('react-bootstrap');
    const { Button } = require('react-bootstrap');
    return (
      <Button
        id={id}
        variant={color}
        onClick={(e) => {
          onClick(e);
        }}
      >
        {`${children}`}
      </Button>
    );
  } catch (error) {
    try {
      // Code to skip Instructure
      if (
        (process.env.REACT_APP_USE_UI &&
          process.env.REACT_APP_USE_UI !== 'instructure') ||
        (ui && ui !== 'instructure')
      ) {
        throw 'Purposely skipping Instructure UI';
      }

      // Import Instructure's component
      require.resolve('@instructure/ui-buttons');
      const { Button } = require('@instructure/ui-buttons');

      return (
        <Button
          id={id}
          margin='small'
          color={color}
          onClick={(e) => {
            onClick(e);
          }}
        >
          {`${children}`}
        </Button>
      );
    } catch (e) {
      try {
        require.resolve('reactstrap');
        const { Button } = require('reactstrap');
        return (
          <Button
            id={id}
            margin='small'
            color={color}
            onClick={(err) => {
              onClick(err);
            }}
          >
            {`${children}`}
          </Button>
        );
      } catch (efinal) {
        //  console.log('Instructor nor reactstrap UI object available: ', e);
        return <div>Cannot display Button component</div>;
      }
    }
  }
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
