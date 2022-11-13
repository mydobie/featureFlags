import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { FeatureFlagProvider } from './components';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <FeatureFlagProvider persist features={[{ id: 'HELLO' }]}>
      <App />
    </FeatureFlagProvider>
  </React.StrictMode>
);
