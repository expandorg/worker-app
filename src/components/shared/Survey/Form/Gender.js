import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@expandorg/components';

import styles from './styles.module.styl';

const options = [
  { value: null, label: "Don't want to anser" },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
];

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
