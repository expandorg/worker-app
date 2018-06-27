import React from 'react';
import PropTypes from 'prop-types';

import styles from './ProfileForm.module.styl';

const ProfileField = ({ name, children }) => (
  <div className={styles.field}>
    <div className={styles.label}>
      {name}
    </div>
    <div className={styles.control}>
      {children}
    </div>
  </div>
);

ProfileField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ProfileField;
