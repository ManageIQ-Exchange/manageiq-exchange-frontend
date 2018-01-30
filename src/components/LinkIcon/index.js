import React from 'react';
import { Icon } from 'patternfly-react';
import './style.css';

const LinkIcon = ({ message, icon }) => (
  <a className="link-icon">
    <Icon name={icon} />
    {message}
  </a>
);

export default LinkIcon;
