import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-bootstrap';
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
    const envOverRide = process.env.REACT_APP_USE_UI;

    return (
      <div>
        <h1>Feature flags set in local storage</h1>
        <Row>
          <Col>
            {envOverRide ? null : (
              <h2>
                React-Bootstrap:
                <br />
              </h2>
            )}
            <FeatureFlagsUI onFeatureChange={this.featureChange} />
          </Col>
          {envOverRide ? null : (
            <Col>
              <h2>
                Instructure:
                <br />
              </h2>
              <FeatureFlagsUI
                ui='instructure'
                onFeatureChange={this.featureChange}
              />
            </Col>
          )}
          {envOverRide ? null : (
            <Col>
              <h2>
                Reactstrap:
                <br />
              </h2>
              <FeatureFlagsUI
                ui='reactstrap'
                onFeatureChange={this.featureChange}
              />
            </Col>
          )}
        </Row>

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
