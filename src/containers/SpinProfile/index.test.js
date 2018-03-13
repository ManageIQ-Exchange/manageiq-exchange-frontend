import React from 'react';
import ReactDOM from 'react-dom';

import { SpinProfile } from './index.js';

// mock translations

jest.mock('react-i18next', () => ({
  translate: () => Component => props => <Component t={() => ''} {...props} />
}));

it('renders SpinProfile without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SpinProfile />, div);
});
