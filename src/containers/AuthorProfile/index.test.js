import React from 'react';
import ReactDOM from 'react-dom';

import { AuthorProfile } from './index.js';

jest.mock('react-i18next', () => ({
  translate: () => Component => props => <Component t={() => ''} {...props} />
}));

it('renders AuthorProfile without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthorProfile />, div);
});
