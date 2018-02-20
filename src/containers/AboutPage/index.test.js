import React from 'react';
import ReactDOM from 'react-dom';
import AboutPage from './index.js';

it('renders AboutPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AboutPage />, div);
});
