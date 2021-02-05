/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import FeatureFlagsCore from './FeatureFlagsUICore';
import {
  getFeatures,
  editFeatureFlag,
  resetFeatureFlags,
} from './featureFlags';

let reduxLoaded = false;
let connect;
try {
  const redux = require('react-redux');
  connect = redux.connect;
  reduxLoaded = true;
  // eslint-disable-next-line no-empty
} catch (e) {}

class FeatureFlagsReduxUI extends React.Component {
  constructor(props) {
    super(props);
    this.featureChange = this.featureChange.bind(this);
    this.resetFeatures = this.resetFeatures.bind(this);
    this.state = {};
  }

  // eslint-disable-next-line class-methods-use-this
  featureChange(id, checked) {
    const { edit, onFeatureChange, flags } = this.props;
    edit(id, checked);
    onFeatureChange(flags);
  }

  resetFeatures() {
    const { reset, onFeatureChange, flags } = this.props;
    reset(onFeatureChange(flags));
  }

  render() {
    const { flags, readonly, ui } = this.props;
    return (
      <FeatureFlagsCore
        features={flags}
        onFeatureClick={this.featureChange}
        onFeatureReset={this.resetFeatures}
        readonly={readonly}
        ui={ui}
      />
    );
  }
}

FeatureFlagsReduxUI.propTypes = {
  onFeatureChange: PropTypes.func,
  edit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  flags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      inuse: PropTypes.bool,
      description: PropTypes.string,
      original: PropTypes.bool,
    })
  ).isRequired,
  readonly: PropTypes.bool,
  ui: PropTypes.string,
};
FeatureFlagsReduxUI.defaultProps = {
  onFeatureChange: () => {},
  readonly: false,
  ui: undefined,
};

// NOTE: The values from SELECTORS will be part of the pros:
const mapStateToProps = (state) => ({
  flags: getFeatures(state),
});

// NOTE: Functions passed from THUNKS and ACTIONS passed to the props
const mapDispatchToProps = (dispatch) => ({
  edit: (id, inuse) => dispatch(editFeatureFlag(id, inuse, true)),
  reset: () => dispatch(resetFeatureFlags(true)),
});

export default reduxLoaded
  ? connect(mapStateToProps, mapDispatchToProps)(FeatureFlagsReduxUI)
  : FeatureFlagsReduxUI;
