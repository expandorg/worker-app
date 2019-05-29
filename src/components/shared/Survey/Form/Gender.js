import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@expandorg/components';

import styles from './styles.module.styl';

const options = ['Male', 'Female'];

export default function Gender({ profile, onChange }) {
  return (
    <div className={styles.field}>
      <Dropdown
        className={styles.dropdown}
        options={options}
        label="Your gender"
        value={profile.gender}
        onChange={gender => onChange({ ...profile, gender })}
      />
    </div>
  );
}

Gender.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
