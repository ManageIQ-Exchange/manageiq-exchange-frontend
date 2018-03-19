import React from 'react';
import ReactDOM from 'react-dom';

import { AuthorsPage } from './index.js';

jest.mock('react-i18next', () => ({
  translate: () => Component => props => <Component t={() => ''} {...props} />
}));

it('renders AuthorsPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthorsPage />, div);
});
