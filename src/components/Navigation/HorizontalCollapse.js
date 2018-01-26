import React from 'react';
import PropTypes from 'prop-types';

const HorizontalCollapse = props => {
  const { children } = props;

  return (
    <div className="collapse navbar-collapse navbar-collapse-1">{children}</div>
  );
};

HorizontalCollapse.propTypes = {
  children: PropTypes.node
};

export default HorizontalCollapse;
