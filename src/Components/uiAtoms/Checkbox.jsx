/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const CBox = (props) => {
  const { id, label, checked, disabled, onChange, ui } = props;

  try {
    if (
      (process.env.REACT_APP_USE_UI &&
        process.env.REACT_APP_USE_UI !== 'bootstrap') ||
      (ui && ui !== 'bootstrap')
    ) {
      throw 'Purposely skipping React-Bootstrap';
    }
    require.resolve('react-bootstrap');
    const { Form } = require('react-bootstrap');
    // eslint-disable-next-line no-console
    console.log('React-Bootstrap');
    return (
      <Form.Switch
        label={label}
        id={id}
        disabled={disabled}
        checked={checked}
        onChange={(e) => {
          onChange(e);
        }}
      />
    );
  } catch (error) {
    try {
      if (
        (process.env.REACT_APP_USE_UI &&
          process.env.REACT_APP_USE_UI !== 'instructure') ||
        (ui && ui !== 'instructure')
      ) {
        throw 'Purposely skipping Instructure UI';
      }

      // Import Instructure's component
      require.resolve('@instructure/ui-checkbox');
      const { Checkbox } = require('@instructure/ui-checkbox');

      return (
        <Checkbox
          label={label}
          variant='toggle'
          size='small'
          disabled={disabled}
          checked={checked}
          id={id}
          onChange={(e) => {
            onChange(e);
          }}
        />
      );
    } catch (e) {
      try {
        // Import reactstrap's component
        require.resolve('reactstrap');
        const { CustomInput } = require('reactstrap');
        return (
          <CustomInput
            type='switch'
            label={label}
            id={id}
            disabled={disabled}
            checked={checked}
            onChange={(err) => {
              onChange(err);
            }}
          />
        );
      } catch (efinal) {
        //  console.log('Instructor nor reactstrap UI object available: ', e);
        return <div>Cannot display Checkbox component</div>;
      }
    }
  }
};

CBox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  ui: PropTypes.string,
};
CBox.defaultProps = {
  id: 'missingId',
  label: 'I am a switch label',
  checked: false,
  disabled: false,
  onChange: (/* event */) => {},
  ui: undefined,
};

export default CBox;
