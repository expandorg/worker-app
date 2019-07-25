import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { format, isValid, parse } from 'date-fns';

import { DateInput } from '@expandorg/components';
import { Field } from './Form';

export default function BirthDate({ profile, onChange }) {
  const [value, setValue] = useState(profile.birthdate);

  const dayChange = useCallback(
    (date, _, dayPickerInput) => {
      setValue(dayPickerInput.getInput().value);
      if (isValid(date)) {
        const birthdate = format(date, 'MM/DD/YYYY');
        onChange({ ...profile, birthdate });
      }
    },
    [onChange, profile, setValue]
  );

  return (
    <Field title="What is your birth date?">
      <DateInput
        value={value}
        theme="white"
        placeholder="Your birth date"
        dayPickerProps={{
          selectedDays: profile.birthdate
            ? parse(profile.birthdate, 'MM/DD/YYYY')
            : undefined,
          disabledDays: d => d >= new Date(),
        }}
        onDayChange={dayChange}
      />
    </Field>
  );
}

BirthDate.propTypes = {
  profile: PropTypes.shape({ birthdate: PropTypes.string }).isRequired,
  onChange: PropTypes.func.isRequired,
};
