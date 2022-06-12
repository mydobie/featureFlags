/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import GitHubImage from '../images/github.svg';

const Home = (): ReactElement => (
  <div className='container'>
    <div className='row'>
      <div className='col'>
        <h1>Feature Flags demo</h1>
        <p>
          This simple package allows you mark items as feature flags and then
          set the availability of those items through configuration.
        </p>
        <p>
          <a href='https://github.com/mydobie/featureFlags'>
            <img src={GitHubImage} alt='' /> View on GitHub
          </a>
        </p>
      </div>
    </div>
    <div className='row'>
      <div className='col'>
        <hr />
        <h2>Version: </h2>
        <ul>
          <li>
            <strong>Project Name: </strong>
            {process.env.REACT_APP_NAME}
          </li>
          <li>
            <strong>Project Version: </strong>
            {process.env.REACT_APP_VERSION}
          </li>
          <li>
            <strong>State persists on refresh: </strong>
            {process.env.REACT_APP_FEATURE_FLAGS_PERSIST
              ? process.env.REACT_APP_FEATURE_FLAGS_PERSIST
              : 'false'}
          </li>
          <li>
            <strong>Git Commit: </strong>
            {process.env.REACT_APP_GIT_SHA}
          </li>
          <li>
            <strong>React Version: </strong>
            {React.version}
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Home;
