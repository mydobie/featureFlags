/* eslint-disable import/no-extraneous-dependencies */
// Contains routing and any application wide items like headers, footers and navigation
// TODO: Break this up into multiple components

import React from 'react';
import PropTypes from 'prop-types';
import {
  NavLink,
  Route,
  Switch,
  Redirect,
  HashRouter as Router, // using hash router so it can be used on github pages
} from 'react-router-dom';

import { connect } from 'react-redux';
import { Nav, NavItem, Container, Row, Col } from 'reactstrap';
import Home from './testPages/Home';
import Version from './testPages/Version';
import FourOhFour from './testPages/FourOhFour';
import FeatureFlag from './testPages/FeatureFlag';
import FeatureFlagRedux from './testPages/FeatureFlagRedux';
import './scss/index.scss';
import {
  loadFeatureFlags,
  isFeatureActive,
  getFeatures,
} from './Components/featureFlags';
import {
  featureFlagsLocalStorage,
  DINOS,
  COLORS,
  featureFlagsRedux,
  FRUITS,
  VEGGIES,
} from './FeatureFlagsConfig';

require('@instructure/canvas-theme');

/* ************************************** */
const buildNav = (features) => (
  <nav>
    <Nav>
      <NavItem>
        <NavLink activeClassName='active' className='nav-link' to='/'>
          Home
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink activeClassName='active' className='nav-link' to='/local'>
          Local Storage Based Feature Flags
        </NavLink>
      </NavItem>

      {isFeatureActive(DINOS) ? (
        <NavItem>
          <span className='nav-link'>LINK TO DINOS</span>
        </NavItem>
      ) : null}

      {isFeatureActive(COLORS) ? (
        <NavItem>
          <span className='nav-link'>LINK TO COLORS</span>
        </NavItem>
      ) : null}

      <NavItem>
        <NavLink activeClassName='active' className='nav-link' to='/redux'>
          Redux Based Feature Flags
        </NavLink>
      </NavItem>
      {isFeatureActive(FRUITS, features) ? (
        <NavItem>
          <span className='nav-link'>LINK TO FRUITS</span>
        </NavItem>
      ) : null}

      {isFeatureActive(VEGGIES, features) ? (
        <NavItem>
          <span className='nav-link'>LINK TO VEGGIES</span>
        </NavItem>
      ) : null}

      <NavItem>
        <NavLink activeClassName='active' className='nav-link' to='/version'>
          Version
        </NavLink>
      </NavItem>
    </Nav>
  </nav>
);

/* ************************************** */

const router = (reRenderApp) => (
  <Switch>
    <Route path='/' exact>
      <Home />
    </Route>

    <Route path='/home' exact>
      <Redirect to='/' />
    </Route>

    <Route path='/local'>
      <FeatureFlag onFeatureChange={reRenderApp} />
    </Route>

    <Route path='/redux'>
      <FeatureFlagRedux />
    </Route>

    <Route path='/version'>
      <Version />
    </Route>

    <Route path='/'>
      <FourOhFour />
    </Route>
  </Switch>
);

/* ************************************** */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.reRenderApp = this.reRenderApp.bind(this);
  }

  async componentDidMount() {
    const { loadFeatureToRedux } = this.props;
    loadFeatureFlags(featureFlagsLocalStorage, false, this.reRenderApp());
    loadFeatureToRedux(featureFlagsRedux);
  }

  componentWillUnmount() {}

  reRenderApp() {
    this.forceUpdate();
  }

  render() {
    const basename = '';

    const { features } = this.props;
    return (
      <div>
        <Router basename={basename}>
          <header>{/* ENTER HEADER HERE */}</header>
          {buildNav(features)}
          <main>
            <Container>
              <Row>
                <Col>{router(this.reRenderApp)}</Col>
              </Row>
            </Container>
          </main>
          <footer>{/* ENTER FOOTER HERE */}</footer>
        </Router>
      </div>
    );
  }
}
App.propTypes = {
  loadFeatureToRedux: PropTypes.func.isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      inuse: PropTypes.bool,
      description: PropTypes.string,
      original: PropTypes.bool,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  features: getFeatures(state),
});

// NOTE: Functions passed from THUNKS and ACTIONS passed to the props
const mapDispatchToProps = (dispatch) => ({
  loadFeatureToRedux: (features) => dispatch(loadFeatureFlags(features, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
