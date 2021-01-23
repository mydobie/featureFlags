/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from './uiAtoms/Checkbox';
import Button from './uiAtoms/Button';

export default class FeatureFlagsUICore extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { features: props.features };
    this.featureClick = this.featureClick.bind(this);
    this.featureReset = this.featureReset.bind(this);
  }

  featureClick(id, inuse) {
    const { onFeatureClick } = this.props;
    onFeatureClick(id, inuse);
  }

  featureReset() {
    const { onFeatureReset } = this.props;
    onFeatureReset();
  }

  container() {
    const { features, readonly } = this.props;
    return (
      <div>
        <h2>Feature Flags</h2>
        {features &&
          features.map((feature) => (
            <div
              key={feature.id}
              style={{ fontWeight: feature.active ? 'bold' : '' }}
              className='customInputItem'
            >
              <Checkbox
                id={feature.id}
                label={feature.description}
                checked={feature.active}
                disabled={readonly}
                onChange={(e) => {
                  this.featureClick(feature.id, e.target.checked);
                }}
              />
            </div>
          ))}
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          {readonly ? null : (
            <Button
              id='resetFeatureFlags'
              color='success'
              onClick={() => {
                this.featureReset();
              }}
            >
              Reset Flags
            </Button>
          )}
        </div>
      </div>
    );
  }

  render() {
    return this.container();
  }
}

FeatureFlagsUICore.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      inuse: PropTypes.bool,
      original: PropTypes.bool,
    })
  ),
  onFeatureClick: PropTypes.func,
  onFeatureReset: PropTypes.func,
  readonly: PropTypes.bool,
};
FeatureFlagsUICore.defaultProps = {
  features: [],
  onFeatureClick: () => {},
  onFeatureReset: () => {},
  readonly: false,
};
