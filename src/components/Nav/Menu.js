import React from 'react';
import {
  HorizontalNav,
  HorizontalNavHeader,
  NavBrand,
  HorizontalCollapse
} from '../Navigation';
import {
  ListGroup,
  ListGroupItem,
  MenuItem,
  DropdownButton,
  Spinner
} from 'patternfly-react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';

import './style.css';

const propTypes = {
  user: PropTypes.object,
  isShowModal: PropTypes.func,
  signOut: PropTypes.func
};

class Menu extends React.Component {
  redirectTo(route) {
    route = { pathname: route };
    browserHistory.push(route);
  }
  onSignOut = () => {
    this.props.signOut();
    this.redirectTo('/');
  }
  render() {
    let { user } = this.props;
    const titleLogin = 'Login';
    return (
      <div>
        <HorizontalNav>
          <HorizontalNavHeader>
            <NavBrand title="ManageIQ" >
              <Link to={'/'} className="header-nav">ManageIQ</Link>
            </NavBrand>
          </HorizontalNavHeader>
          <HorizontalCollapse>
            <ListGroup bsClass="nav navbar-nav navbar-primary">
              <ListGroupItem bsClass="">
                <Link to={'/about/'}>ABOUT</Link>
              </ListGroupItem>
              <ListGroupItem bsClass="">
                <Link to={'/explore/'}>EXPLORE</Link>
              </ListGroupItem>
              <ListGroupItem bsClass="">
                <Link to={'/search/'}>SEARCH</Link>
              </ListGroupItem>
              <ListGroupItem bsClass="">
                <Link to={'/authors/'}>BROWSE AUTHORS</Link>
              </ListGroupItem>
              {user.logged ? (
                <ListGroupItem bsClass="">
                  <Link to={'/mycontent/'}>MY CONTENT</Link>
                </ListGroupItem>
              ) : null}
            </ListGroup>
            <ListGroup bsClass="nav navbar-nav navbar-utility">
              <Spinner
                style={{ backgroundColor: '#cccccc' }}
                loading={user.loading}
              />
              {user.logged ? (
                <DropdownButton
                  bsStyle="link"
                  title={user.user.github_login ? user.user.github_login : ''}
                  key={1}
                  id="dropdown-basic-1"
                >
                  <MenuItem divider />
                  <MenuItem eventKey="5" onClick={this.onSignOut}>
                    Sign out
                  </MenuItem>
                </DropdownButton>
              ) : user.loading ? null : (
                <ListGroupItem
                  bsClass="btn-login"
                  onClick={() => {
                    this.props.isShowModal(true);
                  }}
                >
                  {titleLogin}
                </ListGroupItem>
              )}

              <ListGroupItem bsClass="" />
            </ListGroup>
          </HorizontalCollapse>
        </HorizontalNav>
      </div>
    );
  }
}

Menu.propTypes = propTypes;
export default Menu;
