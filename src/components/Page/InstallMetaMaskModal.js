import React from 'react';
import cn from 'classnames';

import Modal from '../common/Modal';

import styles from './InstallMetaMaskModal.styles';

const InstallMetaMaskModal = () => (
  <Modal heading={<div>Please Install MetaMask</div>}>
    <div className={styles.container}>
      <span className={styles.description}>
        To complete tasks on Gems you will need the MetaMask Chrome Extension. Here is how:
      </span>
      <div className={styles.videoWrapper}>
        <div className={styles.videoInnerWrapper}>
          <iframe
            title="MetaMask Intro"
            className={styles.video}
            src="https://www.youtube.com/embed/6Gf_kRE4MJU"
            frameBorder="0"
            gesture="media"
            allow="encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
      <br />
      <a
        className={cn(styles.btn.toString(), styles.installBtn.toString())}
        href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
        rel="noopener noreferrer"
        target="_blank"
      >
        Go Install MetaMask
      </a>
    </div>
  </Modal>
);

export default InstallMetaMaskModal;
