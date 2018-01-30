import React from "react";
import Menu from "./Nav/Menu";
import Footer from "./Footer/index";
import axios from "axios";
import config from "../config";
import { Link } from "react-router";
import { LogError } from "../service/Log";
import { AboutModal } from "patternfly-react";

import Login from "./Login/";

export default class Layout extends React.Component {
  constructor(props) {

    console.log("env", process.env)
    super(props);
    this.isShowModal = this.isShowModal.bind(this);
    this.state = {
      showModalLogin: false
    };
  }

  UserProfile() {
    this.setState({ showProfile: true });
  }

  isShowModal(show) {
    this.setState({ showModalLogin: show });
  }

  render() {
    let { showModalLogin } = this.state;
    return (
      <div className="app-container">
        <header>
          <Menu isShowModal={this.isShowModal} />
        </header>
        <AboutModal
          show={showModalLogin}
          onHide={() => this.isShowModal(false)}
          productTitle="Log In to Your Account"
          trademarkText={null}
        >
          <Login />
        </AboutModal>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
