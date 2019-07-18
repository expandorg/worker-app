import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@expandorg/components';

import styles from './styles.module.styl';

export default function Gender({ profile, onChange, genders }) {
  const options = useMemo(
    () => genders.map(({ id, value }) => ({ value: id, label: value })),
    [genders]
  );

  const change = useCallback(
    v => {
      onChange({ ...profile, gender: [+v] });
    },
    [onChange, profile]
  );

  const value = profile.gender.length ? profile.gender[0] : undefined;

  return (
    <div className={styles.field}>
      <Dropdown
        className={styles.dropdown}
        options={options}
        label="Your gender"
        value={value}
        onChange={change}
      />
    </div>
  );
}

Gender.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  genders: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
