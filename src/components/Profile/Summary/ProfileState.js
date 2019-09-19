import React from 'react';
import PropTypes from 'prop-types';

import styles from './ProfileState.module.styl';

export default function ProfileState({ profile }) {
  console.log(profile);

  return (
    <div className={styles.container}>
      <div className={styles.pie}>
        <div
          className={styles.sector}
          style={{
            backgroundImage: `
              linear-gradient(126deg, transparent 50%, #FF2D84 50%),
              linear-gradient(90deg, #FF2D84 50%, transparent 50%)`,
          }}
        />
      </div>
    </div>
  );
}

ProfileState.propTypes = {
  profile: PropTypes.shape({}),
};

ProfileState.defaultProps = {
  profile: null,
};
