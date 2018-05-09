import React from 'react';

import styles from './MaintenanceMode.styles';

const MaintenanceMode = () => (
  <div className={styles.body}>
    <h1 className={styles.heading}>
      <img
        className={styles.logo}
        src="/images/logo.svg"
        alt="Gems"
      />
    </h1>
    <div>
      <p>The Gems portal is temporarily unavailable while we take care of some maintenance.</p>
      <p>Visit the <a href="https://gems.org">Gems website</a> for more information about the project.</p>
    </div>
  </div>
);

export default MaintenanceMode;
