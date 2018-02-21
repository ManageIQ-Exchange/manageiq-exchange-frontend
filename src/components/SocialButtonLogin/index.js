import React from 'react';
import { Icon } from 'patternfly-react';

import './style.css';
import PopupWindow from './PopupWindow';
import { toQuery } from './utils';
import config from '../../config';

class SocialButtonLogin extends React.Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.OnRequest = this.OnRequest.bind(this);
    this.OnSuccess = this.OnSuccess.bind(this);
    this.OnFailure = this.OnFailure.bind(this);
  }
  onBtnClick() {
    const search = toQuery({
      client_id: config.GITHUB_OAUTH_ID,
      user: 'email'
    });
    const popup = PopupWindow.open(
      'github-oauth-authorize',
      `https://github.com/login/oauth/authorize?${search}`,
      { height: 1000, width: 600 }
    );

    popup.then(data => this.OnSuccess(data), error => this.OnFailure(error));
  }

  OnRequest() {
    console.info('GitHub Login Request');
  }
  OnSuccess(data) {
    let code = data.code;
    if (!code) {
    } else {
      this.props.onClick(code, this.props.provider);
    }
  }

  OnFailure(error) {
    this.props.islogging(false);
    console.error(error);
  }
  render() {
    let { type, sizeIcon, provider } = this.props;
    const attrs = { onClick: this.onBtnClick };

    return (
      <div className="content-social-login" {...attrs}>
        <div style={{ margin: '0 auto' }}>
          <Icon
            style={{ marginRight: '15px' }}
            name={`${type} fa-${sizeIcon}x`}
          />
          <span className="message-icon">{provider}</span>
        </div>
      </div>
    );
  }
}

export default SocialButtonLogin;
