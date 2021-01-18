import React from 'react';
import PropTypes from 'prop-types';

import { FeatureFlagsUI, isFeatureActive } from '../Components/index';
import { COLORS, DINOS } from '../FeatureFlagsConfig';

export default class FeatureFlags extends React.Component {
  static colorList() {
    return (
      <div>
        <h2>Primary Colors of Light</h2>
        <ul>
          <li>Red</li>
          <li>Green</li>
          <li>Blue</li>
        </ul>
      </div>
    );
  }

  static dinoList() {
    return (
      <div>
        <h2>Common Dinosaurs</h2>
        <ul>
          <li>Pterodactyl</li>
          <li>Lirainosaurus</li>
          <li>Iguanodon</li>
        </ul>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.featureChange = this.featureChange.bind(this);
  }

  featureChange = () => {
    const { onFeatureChange } = this.props;
    onFeatureChange();
  };

  render() {
    return (
      <div>
        <h1>Feature flags set in local storage</h1>
        <FeatureFlagsUI onFeatureChange={this.featureChange} />
        <hr />
        {isFeatureActive(COLORS) ? FeatureFlags.colorList() : null}
        {isFeatureActive(DINOS) ? FeatureFlags.dinoList() : null}
      </div>
    );
  }
}

FeatureFlags.propTypes = {
  onFeatureChange: PropTypes.func,
};
FeatureFlags.defaultProps = {
  onFeatureChange: () => {},
};
