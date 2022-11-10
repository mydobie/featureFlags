import React, { ReactElement } from 'react';
import FeatureFlagsContextUI from '../components/FeatureFlagsUI';

//type ReadOnlyPageProps = {};

const ReadOnlyPage = (): ReactElement => (
  <div className='container'>
    <h1>Local Storage Flags - Read Only</h1>
    <FeatureFlagsContextUI readonly />
  </div>
);

export default ReadOnlyPage;
