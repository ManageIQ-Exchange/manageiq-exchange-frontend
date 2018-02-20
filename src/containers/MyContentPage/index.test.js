import React from 'react';
import ReactDOM from 'react-dom';

import { MyContentPage } from './index.js';

it('renders MyContentPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyContentPage />, div);
});
