import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { DateInput } from '@expandorg/components';
import { Field } from './Form';

export default function BirthDate({ profile, onChange }) {
  const change = useCallback(
    ({ target }) => {
      const birthdate = format(target.value, 'DD/MM/YYYY');
      onChange({ ...profile, birthdate });
    },
    [onChange, profile]
  );

  return (
    <Field title="What is your birth date?">
      <DateInput
        name="birthdate"
        placeholder="Your birth date"
        value={profile.birthdate}
        onChange={change}
      />
    </Field>
  );
}

BirthDate.propTypes = {
  profile: PropTypes.shape({ birthdate: PropTypes.string }).isRequired,
  onChange: PropTypes.func.isRequired,
};
