import React from 'react';
import ReactDOM from 'react-dom';

import { AuthorsPage } from './index.js';

it('renders AuthorsPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthorsPage />, div);
});
