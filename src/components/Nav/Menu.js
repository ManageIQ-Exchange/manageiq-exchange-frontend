import React from "react";
//import { Navbar, Nav, NavItem, MenuItem, NavDropdown, Col, Image, Glyphicon } from 'react-bootstrap';
import {
  HorizontalNav,
  HorizontalNavHeader,
  NavBrand,
  HorizontalCollapse
} from "../Navigation";
import {
  ListGroup,
  ListGroupItem,
  MenuItem,
  DropdownButton
} from "patternfly-react";
import { Link } from "react-router";
import Api from "../../service/Api";

import "./style.css";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.UserLogged = this.UserLogged.bind(this);
    this.UserLogging = this.UserLogging.bind(this);
    this.UserLogOut = this.UserLogOut.bind(this);
    this.postSpins = this.postSpins.bind(this);
    var user = "";
    var ava = "";
    var logged = false;
    if (typeof sessionStorage !== "undefined") {
      if (sessionStorage.getItem("github_login")) {
        (logged = true),
          (user = sessionStorage.getItem("github_login")),
          (ava = sessionStorage.getItem("github_avatar_url"));
      }
    }
    this.state = {
      logged: logged,
      logging: false,
      username: user,
      avatar: ava
    };
  }

  UserLogged() {
    this.setState({
      logging: false,
      logged: true,
      username: sessionStorage.getItem("github_login"),
      avatar: sessionStorage.getItem("github_avatar_url")
    });
  }
  UserLogging(value) {
    this.setState({
      logging: value
    });
  }
  postSpins() {
    Api.RefreshSpin()
      .then(response => {
        if (response.status == 200) {
          console.log(response);
        } else {
          console.log("ERROR " + response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  UserLogOut() {
    Api.SignOut()
      .then(response => {
        if (response.status == 200) {
          this.setState({ logged: false });
          console.log("Logout");
          sessionStorage.clear();
        } else {
          console.log("ERROR " + response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let { user } = this.props;
    const titleLogin = 'Login';
    return (
      <div>
        <HorizontalNav>
          <HorizontalNavHeader>
            <NavBrand
              title="ManageIQ"
              href="/"
              iconImg="http://www.patternfly.org/assets/img/brand.svg"
            />
          </HorizontalNavHeader>
          <HorizontalCollapse>
            <ListGroup bsClass="nav navbar-nav navbar-primary">
              <ListGroupItem bsClass="">
                <a href="#0">ABOUT</a>
              </ListGroupItem>
              <ListGroupItem bsClass="">
                <a href="/explore/">EXPLORE</a>
              </ListGroupItem>
              <ListGroupItem bsClass="">
                <a href="/search/">SEARCH</a>
              </ListGroupItem>
              <ListGroupItem bsClass="">
                <a href="/authors/">BROWSE AUTHORS</a>
              </ListGroupItem>
              {user.logged ? (
                <ListGroupItem bsClass="">
                  <a href="/mycontent/">MY CONTENT</a>
                </ListGroupItem>
              ) : null}
            </ListGroup>
            <ListGroup bsClass="nav navbar-nav navbar-utility">
              {user.logged ? (
                <DropdownButton
                  bsStyle="link"
                  title={user.github_login ? user.github_login : ''}
                  key={1}
                  id="dropdown-basic-1"
                >
                  <MenuItem eventKey="1">My Imports</MenuItem>
                  <MenuItem eventKey="2">Manage E-mail</MenuItem>
                  <MenuItem eventKey="3">My Stars</MenuItem>
                  <MenuItem eventKey="4">Manage Linked Accounts</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="5" onClick={this.props.signOut}>
                    Sign out
                  </MenuItem>
                </DropdownButton>
              ) : (
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
