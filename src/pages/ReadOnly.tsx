import React, { ReactElement } from 'react';
import { FeatureFlagsUI } from '../components';

//type ReadOnlyPageProps = {};

const ReadOnlyPage = (): ReactElement => (
  <div className='container'>
    <h1>Local Storage Flags - Read Only</h1>
    <FeatureFlagsUI readonly />
  </div>
);

export default ReadOnlyPage;
