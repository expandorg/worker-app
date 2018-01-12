import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { css } from 'glamor';
import '../../public/hamburger.css';

const styles = {
  root: css({
    position: 'fixed',
    height: 70,
    width: '100%',
    backgroundColor: 'rgb(28, 37, 65)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '@media screen and (min-width: 1150px)': {
      display: 'none',
    },
  }),
  sidebarToggle: css({
    position: 'absolute',
    left: 10,
  }),
  active: css({
    '@media screen and (max-width: 1150px)': {
      marginLeft: 225,
    },
  }),
};

export default function Header({ onToggleSidebar, sidebarActive }) {
  const classes = classnames({
    [styles.sidebarToggle]: true,
    'toggle -active': sidebarActive,
    toggle: !sidebarActive,
  });

  const rootClasses = classnames({
    [styles.root]: true,
    [styles.active]: sidebarActive,
  });

  return (
    <div className={rootClasses}>
      <button
        data-collapse
        className={classes}
        onClick={onToggleSidebar}
      >
        <span className="icon" />
      </button>

      <img
        className={styles.logo}
        src="../images/logo-icon.svg"
        alt="Gems"
      />
    </div>
  );
}

Header.defaultProps = {
  onToggleSidebar() {},
  sidebarActive: false,
};

Header.propTypes = {
  onToggleSidebar: PropTypes.func,
  sidebarActive: PropTypes.bool,
};
