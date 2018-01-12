import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import { css } from 'glamor';
import Modal from './Modal';
import { PADDING } from '../style-constants';

const styles = {
  container: css({
    textAlign: 'center',
    display: 'block',
  }),
  description: css({
    margin: '3%',
    display: 'block',
  }),
  screenShot: css({
    paddingBottom: '7.5px',
    maxWidth: '80%',
    width: 'calc(100% - 50px)',
    marginBottom: PADDING * 1.5,
    margin: 'auto',
    textAlign: 'center',
    display: 'block',
  }),
};

class UnlockMetaMaskModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <Modal
        heading={(
          <div>
            <span>Please Unlock MetaMask</span>
          </div>
        )}
      >
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
  }
}

export default UnlockMetaMaskModal;
