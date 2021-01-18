/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

let reactstrapAvailable = false;
let CustomInput = () => <div />;
let Button = () => <div />;
let Container = () => <div />;
let Row = () => <div />;
let Col = () => <div />;

try {
  const reactstrap = require('reactstrap');
  CustomInput = reactstrap.CustomInput;
  Button = reactstrap.Button;
  Container = reactstrap.Container;
  Row = reactstrap.Row;
  Col = reactstrap.Col;
  reactstrapAvailable = true;
  // eslint-disable-next-line no-empty
} catch (e) {}

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
    if (reactstrapAvailable === false) {
      return <div>Reactstrap is needed to render the feature flags UI</div>;
    }
    const { features, readonly } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <h2>Feature Flags</h2>
            {features &&
              features.map((feature) => (
                <div
                  key={feature.id}
                  style={{ fontWeight: feature.active ? 'bold' : '' }}
                  className='customInputItem'
                >
                  <CustomInput
                    type='switch'
                    id={feature.id}
                    name='customSwitch'
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
          </Col>
        </Row>
      </Container>
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
