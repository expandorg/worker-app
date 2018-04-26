import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Hamburger from '../common/Hamburger';

import styles from './Header.styles';

export default class Header extends PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
  }

  render() {
    const { collapsed, onToggle } = this.props;
    return (
      <div className={cn(styles.mobileHeader.toString(), { [styles.sbw]: collapsed })} >
        <Hamburger onClick={onToggle} />
        <div className={styles.mobileLogoContainer}>
          <img
            className={styles.mobileLogo}
            src="/images/mobile-logo.png"
            alt="Gems"
          />
        </div>
      </div>
    );
  }
}
