/* eslint-disable no-console */
import React, { ReactElement } from 'react';
import GitHubImage from '../images/github.svg';
import { useGetVersions } from '../js/hooks';

const Home = (): ReactElement => {
  const [versions, loadVersions] = useGetVersions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => loadVersions(), []);
  return (
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
              <strong>Git Commit: </strong>
              {process.env.REACT_APP_GIT_SHA}
            </li>
            <li>
              <strong>React Version: </strong>
              {React.version}
            </li>
            <li>
              <strong>Bootstrap: </strong>
              {versions.bootstrap}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
