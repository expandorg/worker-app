import React from 'react';

import styles from './Unlock.module.styl';

const screen = 'https://j.gifs.com/jqOVoP.gif';

export default function UnlockMetamask() {
  return (
    <div className={styles.container}>
      <div className={styles.description}>Unlock MetaMask. Here is how:</div>
      <img className={styles.screenshot} src={screen} alt="Unlock MetaMask" />
    </div>
  );
}
