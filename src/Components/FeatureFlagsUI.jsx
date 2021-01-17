import React from 'react';
import PropTypes from 'prop-types';
import FeatureFlagsCore from './FeatureFlagsUICore';
import {
  editFeatureFlag,
  resetFeatureFlags,
  getFeatures,
} from './featureFlags';

export default class FeatureFlagsUI extends React.Component {
  constructor(props) {
    super(props);
    this.featureChange = this.featureChange.bind(this);
    this.featureReset = this.featureReset.bind(this);
  }

  featureChange(id, checked) {
    const { onFeatureChange } = this.props;
    editFeatureFlag(id, checked);
    onFeatureChange(this.features());
  }

  featureReset() {
    const { onFeatureChange } = this.props;
    resetFeatureFlags();
    onFeatureChange(this.features());
  }

  // eslint-disable-next-line class-methods-use-this
  features() {
    return getFeatures();
  }

  render() {
    const { readonly } = this.props;
    return (
      <FeatureFlagsCore
        onFeatureClick={this.featureChange}
        onFeatureReset={this.featureReset}
        features={this.features()}
        readonly={readonly}
      />
    );
  }
}

FeatureFlagsUI.propTypes = {
  onFeatureChange: PropTypes.func,
  readonly: PropTypes.bool,
};
FeatureFlagsUI.defaultProps = { onFeatureChange: () => {}, readonly: false };
