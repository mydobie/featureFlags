/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import CoreUI from './CoreUI';
import {
  getFeatureFlagsRedux,
  editFeatureFlag,
  resetFeatureFlags,
} from './featureFlags';

// @ts-ignore
// eslint-disable-next-line react/prop-types
const FeatureFlagsReduxUI = ({ onFeatureEdit, features, reset }) => (
  <>
    <CoreUI
      features={features}
      onFeatureClick={(id, checked) => {
        onFeatureEdit(id, checked);
        // const newFeatures = [...features].map((feature) =>
        //  feature.id === id ? { ...feature, active: checked } : feature
        // );
        // setFeatures(newFeatures);
      }}
      onFeatureReset={() => {
        reset();
      }}
    />
  </>
);

// @ts-ignore
const mapStateToProps = (state) => ({
  features: getFeatureFlagsRedux(state),
});

// @ts-ignore
const mapDispatchToProps = (dispatch) => ({
  onFeatureEdit: (id: string, active: boolean) =>
    dispatch(editFeatureFlag(id, active, true)),
  reset: () => dispatch(resetFeatureFlags(true)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeatureFlagsReduxUI);

// https://react-redux.js.org/using-react-redux/usage-with-typescript
