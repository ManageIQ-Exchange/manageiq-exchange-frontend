import React from 'react';
import { translate } from 'react-i18next';

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

const defaultProps = {
  t: key => key
};

const propTypes = {
  user: PropTypes.object,
  t: PropTypes.func,
  isShowModal: PropTypes.func,
  signOut: PropTypes.func
};

export class Menu extends React.Component {
  constructor(props) {
    super(props);
    console.error('constructor', props);
  }
  redirectTo(route) {
    route = { pathname: route };
    browserHistory.push(route);
  }
  onSignOut = () => {
    this.props.signOut();
    this.redirectTo('/');
  };
  render() {
    let { user, t } = this.props;
    const titleLogin = 'Login';
    return (
      <div>
        <HorizontalNav>
          <HorizontalNavHeader>
            <NavBrand title="ManageIQ">
              <Link to={'/'} className="header-nav">
                ManageIQ
              </Link>
            </NavBrand>
          </HorizontalNavHeader>
          <HorizontalCollapse>
            <ListGroup bsClass="nav navbar-nav navbar-primary">
              <ListGroupItem bsClass="">
                <Link to={'/about/'}>{t('navbar.about')}</Link>
              </ListGroupItem>
              <ListGroupItem bsClass="">
                <Link to={'/explore/'}>{t('navbar.explore')}</Link>
              </ListGroupItem>
              <ListGroupItem bsClass="">
                <Link to={'/search/'}>{t('navbar.search')}</Link>
              </ListGroupItem>
              <ListGroupItem bsClass="">
                <Link to={'/authors/'}>{t('navbar.authors')}</Link>
              </ListGroupItem>
              {user.logged ? (
                <ListGroupItem bsClass="">
                  <Link to={'/mycontent/'}>{t('navbar.mycontent')}</Link>
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
                  <MenuItem eventKey="5" onClick={this.onSignOut}>
                    {t('navbar.signout')}
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
Menu.defaultProps = defaultProps;

export default translate()(Menu);
