import React from 'react';
import ReactDOM from 'react-dom';

import { SpinProfile } from './index.js';

it('renders SpinProfile without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SpinProfile />, div);
});
