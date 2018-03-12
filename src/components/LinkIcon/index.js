import React from 'react';
import { Icon } from 'patternfly-react';
import './style.css';

const LinkIcon = ({ message, icon, href }) => {
  let className = 'link-icon ';
  className += href ? 'link-pointer' : '';
  return (
    <a className={className} target="_blank" href={href}>
      <Icon name={icon} />
      <span style={{ marginLeft: 10 }}>{message}</span>
    </a>
  );
};

export default LinkIcon;
