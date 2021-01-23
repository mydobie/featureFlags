/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

let CustomElement = <div>The alert component cannot be displayed.</div>;
let type;

try {
  // Code to skip to reactstrap
  if (
    process.env.REACT_APP_USE_UI &&
    process.env.REACT_APP_USE_UI !== 'instructure'
  ) {
    throw 'Purposely skipping Instructure UI and using reactstrap';
  }

  // Import Instructure's component
  require.resolve('@instructure/ui-checkbox');
  const { Checkbox } = require('@instructure/ui-checkbox');

  CustomElement = Checkbox;
  type = 'instructure';
} catch (error) {
  try {
    // Import reactstrap's component
    require.resolve('reactstrap');
    const { CustomInput } = require('reactstrap');
    CustomElement = CustomInput; // NOTE: This line is causing propTypes errors in console
    type = 'reactstrap';
  } catch (e) {
    //  console.log('Instructor nor reactstrap UI object available: ', e);
  }
}

const CBox = (props) => {
  const { id, label, checked, disabled, onChange } = props;

  const instructure = (
    <CustomElement
      label={label}
      value='small'
      variant='toggle'
      size='small'
      disabled={disabled}
      checked={checked}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );

  const reactstrap = (
    <CustomElement
      type='switch'
      id={id}
      name='customSwitch'
      label={label}
      checked={checked}
      disabled={disabled}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
  return type === 'instructure' ? instructure : reactstrap;
};

CBox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
CBox.defaultProps = {
  id: 'missingId',
  label: 'I am a switch label',
  checked: false,
  disabled: false,
  onChange: (/* event */) => {},
};

export default CBox;
