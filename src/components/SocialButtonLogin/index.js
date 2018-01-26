import React from 'react';
import { Icon } from 'patternfly-react';

import { imgIndex } from '../../ImageImport';
import './style.css';

const SocialButtonLogin = ({type, sizeIcon, message}) =>{

  return (
    <div className="content-social-login">
      <div style={{width:'100px', margin:'0 auto'}}>
        <span style={{float:'right'}}><Icon style={{marginRight:'15px'}} name={`${type} fa-${sizeIcon}x`} /><span className="message-icon">{message}</span></span>
      </div>
    </div>
  );
}

export default SocialButtonLogin;
