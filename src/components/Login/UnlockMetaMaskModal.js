import React from 'react';

import Modal from '../common/Modal';

import styles from './UnlockMetaMaskModal.module.styl';

const UnlockMetaMaskModal = () => (
  <Modal heading="Please Unlock MetaMask">
    <div className={styles.container}>
      <span className={styles.description}>
        Unlock MetaMask. Here is how:
      </span>
      <img
        className={styles.screenShot}
        src="https://j.gifs.com/jqOVoP.gif"
        alt="Unlock MetaMask Gif"
      />
    </div>
  </Modal>
);

export default UnlockMetaMaskModal;
