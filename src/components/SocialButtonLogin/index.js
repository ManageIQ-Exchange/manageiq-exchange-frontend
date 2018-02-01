import React from "react";
import { Icon } from "patternfly-react";

import "./style.css";
import PopupWindow from "./PopupWindow";
import { toQuery, sessionUserDataSave } from "./utils";
import Api from "../../service/Api";

const provider = 'github.com';

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
      client_id: process.env.GITHUB_OAUTH_ID
        ? process.env.GITHUB_OAUTH_ID
        : '3e7f2871ca45fbcbb171',
      user: "prueba1"
    });

    const popup = PopupWindow.open(
      "github-oauth-authorize",
      `https://github.com/login/oauth/authorize?${search}`,
      { height: 1000, width: 600 }
    );

    popup.then(data => this.OnSuccess(data), error => this.OnFailure(error));
  }

  OnRequest() {
    console.info("GitHub Login Request");
  }
  OnSuccess(data) {
    console.log("code",data.code);
    let code = data.code;
    if (!code) {
    } else {
      this.props.onClick(code, provider);
    }
  }

  OnFailure(error) {
    this.props.islogging(false);
    console.error(error);
  }
  render() {
    let { type, sizeIcon, message } = this.props;
    const attrs = { onClick: this.onBtnClick };

    return (
      <div className="content-social-login" {...attrs}>
        <div style={{ width: "100px", margin: "0 auto" }}>
          <span style={{ float: "right" }}>
            <Icon
              style={{ marginRight: "15px" }}
              name={`${type} fa-${sizeIcon}x`}
            />
            <span className="message-icon">{message}</span>
          </span>
        </div>
      </div>
    );
  }
}

export default SocialButtonLogin;
