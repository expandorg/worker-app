import React from 'react';
import cn from 'classnames';

import styles from './Install.module.styl';

export default function InstallMetamask() {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        To complete tasks on Gems you will need the MetaMask Chrome Extension.
        Here is how:
      </div>
      <div className={styles.video}>
        <iframe
          title="MetaMask Intro"
          className={styles.iframe}
          src="https://www.youtube.com/embed/6Gf_kRE4MJU"
          frameBorder="0"
          gesture="media"
          allow="encrypted-media"
          allowFullScreen
        />
      </div>
      <div className={styles.actions}>
        <a
          className={cn(
            'gem-button',
            'gem-button-pink',
            'gem-button-large',
            styles.install
          )}
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
          rel="noopener noreferrer"
          target="_blank"
        >
          Go Install MetaMask
        </a>
      </div>
    </div>
  );
}
