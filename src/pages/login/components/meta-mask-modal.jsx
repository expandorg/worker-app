import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Modal from '../../../components/modal';

const styles = {
  modal: css({
    padding: 30,
  }),
  container: css({
    textAlign: 'center',
    display: 'block',
  }),
  screenShot: css({
    maxWidth: '80%',
    margin: 'auto',
    marginTop: 15,
  }),
  header: css({
    fontSize: 22,
    margin: '5px 0',
    fontWeight: 400,
  }),
};


export default function MetaMaskModal({ isShown }) {
  return (
    <Modal className={styles.modal} canClose={false} isActive={isShown}>
      <h6 className={styles.header}>Please unlock MetaMask</h6>

      <div className={styles.container}>
        <p>
          Unlock MetaMask. Here is how:
        </p>

        <img
          className={styles.screenShot}
          src="https://j.gifs.com/jqOVoP.gif"
          alt="Unlock MetaMask Gif"
        />
      </div>
    </Modal>
  );
}

MetaMaskModal.defaultProps = {
  isShown: false,
};

MetaMaskModal.propTypes = {
  isShown: PropTypes.bool,
};
