import React from 'react';
import { connect } from 'react-redux';
import FeatureFlagsReduxUI from '../components/FeatureFlagsReduxUI';
import { isFeatureActive } from '../components/featureFlags';
import { VEGGIES, FRUITS } from '../FeatureFlagsConfig';

// @ts-ignore
// eslint-disable-next-line react/prop-types
const ReduxPage = ({ isActive }) => (
  <div className='container'>
    <h1>Feature flags - redux</h1>
    <FeatureFlagsReduxUI />
    <hr />
    {isActive(VEGGIES) ? <div>VEGGIES!!!</div> : null}
    {isActive(FRUITS) ? <div>FRUITS!!!</div> : null}
  </div>
);

// @ts-ignore
const mapStateToProps = (state) => ({
  isActive: (id: string) => isFeatureActive(id, state),
});

const mapDispatchToProps = (/* dispatch */) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPage);
