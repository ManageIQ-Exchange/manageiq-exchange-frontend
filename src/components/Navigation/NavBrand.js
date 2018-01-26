import React from 'react';
import PropTypes from 'prop-types';

const NavBrand = props => {
  const { title, href, iconImg, children } = props;
  // The img prop is just a shorthand for the titleImg prop.
  // When also using iconImg, it is less confusing to pass titleImg instead of img.
  const titleImg = props.titleImg || props.img;

  const brandChildren = children || (
    <span>
      {iconImg && (
        <img className="navbar-brand-icon" src={iconImg} alt={title} />
      )}
      {titleImg && (
        <img className="navbar-brand-name" src={titleImg} alt={title} />
      )}
      {!titleImg && title && <span className="navbar-brand-txt">{title}</span>}
    </span>
  );
  
  return href ? (
    <a href={href} className="navbar-brand">
      {brandChildren}
    </a>
  ) : (
    <span className="navbar-brand">{brandChildren}</span>
  );
};

NavBrand.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  iconImg: PropTypes.string,
  titleImg: PropTypes.string,
  img: PropTypes.string,
  children: PropTypes.node
};

NavBrand.displayName = 'Nav.Brand';

export default NavBrand;
