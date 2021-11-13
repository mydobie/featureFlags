/* eslint-disable no-console */
import React, { ReactElement } from 'react';

const Home = (): ReactElement => {
  const [bootstrap, setBootstrap] = React.useState(null);
  const [reactRedux, setReactRedux] = React.useState(null);

  React.useEffect(() => {
    // KKD made this a helper function
    const getVersions = async () => {
      try {
        fetch('/featureFlags/versions.json')
          .then((res) => res.json())
          .then((response) => {
            const versions = response;

            if (versions) {
              setBootstrap(versions.bootstrap);
              setReactRedux(versions['react-redux']);
            } else {
              throw Error('Uncaught Error');
            }
          })
          .catch(() => {
            console.error('Error finding versions file');
          });
      } catch (_error) {
        console.error('Error finding versions file');
      }
    };
    getVersions();
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Feature Flags demo</h1>
          <p>
            This simple package allows you mark items as feature flags and then
            set the availability of those items through configuration.
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
            <li>
              <strong>React Redux: </strong>
              {reactRedux}
            </li>
            <li>
              <strong>Bootstrap CSS Version: </strong>
              {bootstrap}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
