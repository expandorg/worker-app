import React from 'react';
import { css } from 'glamor';
import { BLUE } from '../style-constants';

const styles = {
  body: css({
    width: '100%',
    height: '100%',
    background: '#f2f2f2',
    fontFamily: 'Poppins',
    color: BLUE,
    textAlign: 'center',
  }),
  heading: css({
    margin: 0,
  }),
  logo: css({
    width: 119,
    height: 50,
    marginTop: 30,
  }),
};

function MaintenanceMode() {
  return (
    <div className={styles.body}>
      <h1 className={styles.heading}>
        <img
          className={styles.logo}
          src="../images/logo.svg"
          alt="Gems"
        />
      </h1>
      <div>
        <p>The Gems portal is temporarily unavailable while we take care of some maintenance.</p>
        <p>Visit the <a href="https://gems.org">Gems website</a> for more information about the project.</p>
      </div>
    </div>
  );
}

export default MaintenanceMode;
