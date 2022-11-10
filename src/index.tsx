import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import { FeatureFlagProvider } from './components';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <FeatureFlagProvider features={[{ id: 'hello' }]}>
      <App />
    </FeatureFlagProvider>
  </React.StrictMode>
);
