import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// for internet explorer/ old browser that dont have promises
// import PromisePolyfill from 'promise-polyfill'

// if (!window.Promise) {
//   window.Promise = PromisePolyfill
// }
