import React, { ReactElement } from 'react';
import { FeatureFlagsUI, FeatureFlagsReduxUI } from '../components';

//type ReadOnlyPageProps = {};

const ReadOnlyPage = (): ReactElement => (
  <div className='container'>
    <h1>Local Storage Flags - Read Only</h1>
    <FeatureFlagsUI readonly />

    <hr />
    <h1>Redux Flags - Read Only</h1>
    <FeatureFlagsReduxUI readonly />
  </div>
);

export default ReadOnlyPage;
