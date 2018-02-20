import React from 'react';
import ReactDOM from 'react-dom';

import { ExplorePage } from './index.js';

it('renders ExplorePage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ExplorePage />, div);
});
