import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import classNames from 'classnames';
import { css } from 'glamor';
import Modal from './Modal';
import { BTN } from '../style-constants';

const styles = {
  container: css({
    textAlign: 'center',
    display: 'block',
  }),
  description: css({
    margin: '5%',
    display: 'block',
  }),
  video: css({
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
  }),
  videoInnerWrapper: css({
    position: 'relative',
    paddingBottom: '56.2%',
    width: '100%',
    height: '100%',
  }),
  videoWrapper: css({
    width: '100%',
    height: '100%',
    maxHeight: '288px',
    maxWidth: '525px',
    margin: 'auto',
  }),
  btn: BTN,
  installBtn: css({
    marginTop: '16px',
  }),
};

class InstallMetaMaskModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const href = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';

    return (
      <Modal
        heading={(
          <div>
            <span>Please Install MetaMask</span>
          </div>
        )}
      >
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
          <button
            className={classNames({ [styles.btn]: true, [styles.installBtn]: true })}
            onClick={() => { window.open(href, '_blank'); }}
          >
            Go Install MetaMask
          </button>
        </div>
      </Modal>
    );
  }
}

export default InstallMetaMaskModal;
