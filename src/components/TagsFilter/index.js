import React from 'react';
import { Icon } from 'patternfly-react';

import './style.css';

const TagsFilter = ({ name, onClick }) => (
  <div
    id="content-tag"
    className="label label-info"
    onClick={() => onClick(name)}
  >
    <span>{name}</span>
    <Icon style={{ marginLeft: '5px' }} name="close" />
  </div>
);

export default TagsFilter;
