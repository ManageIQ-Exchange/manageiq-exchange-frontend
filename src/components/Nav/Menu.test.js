import React from 'react';
import expect from 'expect';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Menu } from './Menu';
import { DropdownButton } from 'patternfly-react';

const nameUsername = 'Test Name';
let user = { logged: true, user: { github_login: nameUsername } };
describe('Component Menu', () => {
  beforeEach(() => {
    configure({ adapter: new Adapter() });
  });

  it('Navbar', () => {
    let component = mount(<Menu user={user} />);
    let DropdownButton = component.find('DropdownButton');

    expect(DropdownButton.first().props().title === nameUsername);

    user = { logged: false, user: {} };
    component = mount(<Menu user={user} />);

    expect(component.find('DropdownButton').length === 0);
  });
});
