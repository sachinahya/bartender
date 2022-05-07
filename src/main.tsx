import 'modern-normalize';
import './global.css';

// Can be removed when this PR is released.
// https://github.com/TanStack/react-location/pull/236
import 'regenerator-runtime';

import { createRoot } from 'react-dom/client';

import { App } from './app';

const container = document.querySelector('#root');

if (!container) {
  throw new Error('Missing #root element.');
}

createRoot(container).render(<App />);
