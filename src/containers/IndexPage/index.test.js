import React from 'react';
import ReactDOM from 'react-dom';

import IndexPage from './index.js';

it('renders IndexPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IndexPage />, div);
});
