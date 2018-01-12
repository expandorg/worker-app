import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { BTN } from '../style-constants';
import Modal from './modal';

const styles = {
  root: css({
    padding: 40,
  }),
  desc: css({
    fontSize: 14,
    margin: '5px 0',
  }),
  header: css({
    fontSize: 24,
    display: 'block',
    marginBottom: 10,
  }),
  videoWrapper: css({
    width: '100%',
    maxWidth: 550,
    height: 250,
    margin: '30px auto',
    display: 'block',
  }),
  button: css(BTN, {
    margin: '5px auto',
    textDecoration: 'none',
    height: 'initial',
    padding: 12,
    fontSize: 15,
  }),
};

const INSTALL_URL = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';

export default function InstallMetaMaskPrompt({ isShown }) {
  return (
    <Modal className={styles.root} canClose={false} isActive={isShown}>
      <div>
        <span className={styles.header}>Please install MetaMask</span>

        <span className={styles.desc}>
          To complete tasks on Gems you will need the MetaMask Chrome Extension. Here is how:
        </span>

        <iframe
          title="MetaMask Intro"
          className={styles.videoWrapper}
          src="https://www.youtube.com/embed/6Gf_kRE4MJU"
          frameBorder="0"
          gesture="media"
          allow="encrypted-media"
          allowFullScreen
        />

        <a className={styles.button} href={INSTALL_URL} target="_blank">
          Go Install MetaMask
        </a>
      </div>
    </Modal>
  );
}

InstallMetaMaskPrompt.defaultProps = {
  isShown: false,
};

InstallMetaMaskPrompt.propTypes = {
  isShown: PropTypes.bool,
};
