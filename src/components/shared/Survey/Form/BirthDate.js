import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { DateInput } from '@expandorg/components';

import styles from './styles.module.styl';

export default function BirthDate({ profile, onChange }) {
  const change = useCallback(
    ({ target }) => {
      const birthdate = format(target.value, 'DD/MM/YYYY');
      onChange({ ...profile, birthdate });
    },
    [onChange, profile]
  );

  return (
    <div className={styles.field}>
      <DateInput
        name="birthdate"
        placeholder="Your birth date"
        value={profile.birthdate}
        onChange={change}
      />
    </div>
  );
}

BirthDate.propTypes = {
  profile: PropTypes.shape({ birthdate: PropTypes.string }).isRequired,
  onChange: PropTypes.func.isRequired,
};
