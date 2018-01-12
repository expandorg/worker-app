import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { Link } from 'react-router';

const styles = {
  root: css({
    minWidth: 225,
    backgroundColor: 'rgb(28, 37, 65)',
    position: 'relative',
    '@media screen and (max-width: 1150px)': {
      display: 'none',
      backgroundColor: 'rgb(11, 19, 43)',
    },
  }),
  active: css({
    '@media screen and (max-width: 1150px)': { display: 'block' },
  }),
  link: css({
    opacity: 0.6,
    color: '#fff',
    textDecoration: 'none',
    display: 'block',
    margin: '10px 0',
    cursor: 'pointer',
    fontSize: 18,
  }),
  logo: css({
    '@media screen and (max-width: 1150px)': { display: 'none' },
  }),
  wrapper: css({ padding: 20 }),
  nav: css({ padding: '10px 0' }),
  activeLink: css({ opacity: 1 }),
};

const NavLink = ({ children, ...props }) => (
  <Link className={`${styles.link}`} activeClassName={`${styles.activeLink}`} {...props}>
    {children}
  </Link>
);

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Sidebar({ isOpen }) {
  const classes = classnames({
    [styles.root]: true,
    [styles.active]: isOpen,
  });

  return (
    <div className={classes}>
      <div className={styles.wrapper}>
        <img
          className={styles.logo}
          src="../images/logo.svg"
          alt="Gems"
        />

        <div className={styles.nav}>
          <NavLink to="/login">Log in</NavLink>
        </div>
      </div>
    </div>
  );
}

Sidebar.defaultProps = {
  isOpen: false,
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
};
