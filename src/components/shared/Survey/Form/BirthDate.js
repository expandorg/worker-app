import React from 'react';
import PropTypes from 'prop-types';

import { DateInput } from '@expandorg/components';

import styles from './styles.module.styl';

export default function BirthDate({ profile, onChange }) {
  return (
    <div className={styles.field}>
      <DateInput
        name="birthdate"
        placeholder="Your birth date"
        value={profile.birthdate}
        onChange={({ target }) =>
          onChange({ ...profile, birthdate: target.value })
        }
      />
    </div>
  );
}

BirthDate.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
