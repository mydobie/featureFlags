import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getFeatures,
  isFeatureActive,
  FeatureFlagsReduxUI,
} from '../Components/index';

class FeatureFlagRedux extends React.Component {
  static fruitsList() {
    return (
      <div>
        <h2>Fruits</h2>
        <ul>
          <li>Apples</li>
          <li>Grapes</li>
          <li>Oranges</li>
        </ul>
      </div>
    );
  }

  static veggieList() {
    return (
      <div>
        <h2>Vegetables</h2>
        <ul>
          <li>Broccoli</li>
          <li>Carrots</li>
          <li>Spinach</li>
        </ul>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { features } = this.props;
    return (
      <div>
        <h1>Feature Flags stored in Redux store</h1>
        <FeatureFlagsReduxUI />
        <hr />
        {isFeatureActive('FRUITS', features)
          ? FeatureFlagRedux.fruitsList()
          : null}
        {isFeatureActive('VEGGIES', features)
          ? FeatureFlagRedux.veggieList()
          : null}
      </div>
    );
  }
}

FeatureFlagRedux.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      inuse: PropTypes.bool,
      description: PropTypes.string,
      original: PropTypes.bool,
    })
  ).isRequired,
};
FeatureFlagRedux.defaultProps = {};

// NOTE: The values from SELECTORS will be part of the pros:
const mapStateToProps = (state /* , props */) => ({
  features: getFeatures(state),
});
// NOTE: Functions passed from THUNKS and ACTIONS passed to the props
const mapDispatchToProps = (/* dispatch */) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FeatureFlagRedux);
