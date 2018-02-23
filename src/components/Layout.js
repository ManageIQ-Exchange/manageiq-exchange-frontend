import React from 'react';
import Menu from './Nav/Menu';
import { AboutModal, Alert } from 'patternfly-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './Login/';
import { signIn, checkSessionUser, signOut } from '../thunk/user';
import { apiVersion } from '../thunk/dataApi';
import { User } from '../models/user';

const defaultProps = {
  apiVersion: {
    dataApi: {},
    error: null
  },
  user: {
    user: new User(),
    error: null
  }
};
const propTypes = {
  checkSessionUser: PropTypes.func,
  getApiVersion: PropTypes.func,
  user: PropTypes.object,
  apiVersion: PropTypes.object
};
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.isShowModal = this.isShowModal.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.state = {
      showModalLogin: false,
      showAlertAlready: false
    };
  }
  componentDidMount() {
    this.props.checkSessionUser();
    this.props.getApiVersion();
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
  changeShowAlert = () => {
    this.setState({ showAlertAlready: true });
  };
  renderAlert = () => {
    const { user, apiVersion } = this.props;
    const { showAlertAlready } = this.state;
    const message = 'There have been a problem with the server';
    return !showAlertAlready ?
      user.error || apiVersion.error ? (
      <Alert
        style={{
          width: '30%',
          position: 'absolute',
          zIndex: 9999,
          right: '2%'
        }}
        type="warning"
        onDismiss={this.changeShowAlert}
      >
        {message}
      </Alert>
      ) : null
      : null;
  };
  render() {
    let { showModalLogin } = this.state;
    const { user, apiVersion } = this.props;
    const dataApi = apiVersion.dataApi;
    return (
      <div className="app-container">
        <header>
          <Menu
            isShowModal={this.isShowModal}
            user={user}
            signOut={this.props.signOut}
          />
        </header>
        {this.renderAlert()}
        <AboutModal
          show={showModalLogin}
          onHide={() => this.isShowModal(false)}
          productTitle="Sign In to Your Account"
          trademarkText={null}
        >
          <Login onSignIn={this.onClickLogin} provider={dataApi.providers} />
        </AboutModal>
        <div className="content-layout">{this.props.children}</div>
      </div>
    );
  }
}
Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    user: state.user,
    apiVersion: state.apiVersion
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signIn: (code, provider) => dispatch(signIn(code, provider)),
    signOut: () => dispatch(signOut()),
    checkSessionUser: () => dispatch(checkSessionUser()),
    getApiVersion: () => dispatch(apiVersion())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
