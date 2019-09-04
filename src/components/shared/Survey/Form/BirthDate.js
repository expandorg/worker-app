import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { format, parse } from 'date-fns';

import { DropdownDate } from '@expandorg/components';
import { Field } from './Form';

import styles from './BirthDate.module.styl';

export default function BirthDate({ profile, onChange }) {
  const [value, setValue] = useState(
    profile.birthdate || format(new Date(), 'MM/DD/YYYY')
  );

  const dayChange = useCallback(
    date => {
      const birthdate = format(date, 'MM/DD/YYYY');
      setValue(birthdate);
      onChange({ ...profile, birthdate });
    },
    [onChange, profile, setValue]
  );

  return (
    <Field title="What is your birth date?">
      <DropdownDate
        className={styles.birthdate}
        value={parse(value, 'MM/DD/YYYY')}
        onChange={dayChange}
      />
    </Field>
  );
}

BirthDate.propTypes = {
  profile: PropTypes.shape({ birthdate: PropTypes.string }).isRequired,
  onChange: PropTypes.func.isRequired,
};
