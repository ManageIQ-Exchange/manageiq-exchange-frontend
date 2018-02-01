import React from "react";
import Menu from "./Nav/Menu";
import Footer from "./Footer/index";
import axios from "axios";
import config from "../config";
import { Link } from "react-router";
import { LogError } from "../service/Log";
import { AboutModal } from "patternfly-react";
import { connect } from "react-redux";
import Login from "./Login/";
import { signIn } from "../thunk/user";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.isShowModal = this.isShowModal.bind(this);
    this.state = {
      showModalLogin: false
    };
    console.log("props", props);
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
          <Login onSignIn={this.props.signIn} />
        </AboutModal>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: (code, provider) => dispatch(signIn(code, provider))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
