import React from 'react';
import ReactDOM from 'react-dom';

import { AuthorProfile } from './index.js';

it('renders AuthorProfile without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthorProfile />, div);
});
