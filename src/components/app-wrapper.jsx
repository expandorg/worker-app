import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import InstallMetaMaskPrompt from '../containers/install-meta-mask-prompt';
import Header from '../containers/header';
import Sidebar from '../containers/sidebar';

const styles = {
  root: css({
    height: '100%',
    width: '100%',
    fontFamily: 'Poppins',
  }),
  content: css({
    width: 'calc(100% - 225px)',
    '@media screen and (max-width: 1150px)': {
      marginTop: '70px',
      width: '100%',
    },
  }),
  wrapper: css({
    display: 'flex',
    height: '100%',
  }),
};

export default function AppWrapper({ children }) {
  return (
    <div className={styles.root}>
      <InstallMetaMaskPrompt />
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
