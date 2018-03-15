import React from 'react';
import AboutPage from './index.js';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

beforeEach(() => {
  configure({ adapter: new Adapter() });
});

it('renders AboutPage without crashing', () => {
  mount(<AboutPage />);
});
