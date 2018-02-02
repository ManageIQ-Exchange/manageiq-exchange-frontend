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
import { signIn, checkSessionUser, signOut } from "../thunk/user";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.isShowModal = this.isShowModal.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.state = {
      showModalLogin: false
    };
  }
  componentDidMount() {
    this.props.checkSessionUser();
  }
  UserProfile() {
    this.setState({ showProfile: true });
  }

  isShowModal(show) {
    this.setState({ showModalLogin: show });
  }

  onClickLogin(code, provider) {
    this.props.signIn(code, provider);
    this.isShowModal(false);
  }

  render() {
    let { showModalLogin } = this.state;
    let { user } = this.props;

    return (
      <div className="app-container">
        <header>
          <Menu isShowModal={this.isShowModal} user={user} signOut={this.props.signOut} />
        </header>
        <AboutModal
          show={showModalLogin}
          onHide={() => this.isShowModal(false)}
          productTitle="Log In to Your Account"
          trademarkText={null}
        >
          <Login
            onSignIn={this.onClickLogin}
          />
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
    signIn: (code, provider) => dispatch(signIn(code, provider)),
    signOut: () => dispatch(signOut()),
    checkSessionUser: () => dispatch(checkSessionUser())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
