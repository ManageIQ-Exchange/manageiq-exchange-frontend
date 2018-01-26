import React from 'react';
import { Icon } from 'patternfly-react';

import { imgIndex } from '../../ImageImport';
import './style.css';

const HeaderTitle = ({name}) => (
  <div id="content-img-tab">
    <img id="imgHome" style={{height:'50px'}} src={imgIndex} alt="image init"  />
    <span className="name-tab">{name}</span>
  </div>
);

export default HeaderTitle;
