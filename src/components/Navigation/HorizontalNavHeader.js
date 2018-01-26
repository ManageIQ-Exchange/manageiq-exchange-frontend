import React from 'react';
import PropTypes from 'prop-types';

const HorizontalNavHeader = props => {
  const { children } = props;

  return <div className="navbar-header">{children}</div>;
};

HorizontalNavHeader.propTypes = {
  children: PropTypes.node
};

HorizontalNavHeader.displayName = 'HorizontalNav.Header';

export default HorizontalNavHeader;
