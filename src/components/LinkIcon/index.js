import React from 'react';
import { Icon } from 'patternfly-react';
import './style.css';

const LinkIcon = ({ message, icon, href }) => {
  return (
    <a className="link-icon" href={href}>
      <Icon name={icon} />
      <span style={{ marginLeft: 10 }}>{message}</span>
    </a>
  );
};

export default LinkIcon;
