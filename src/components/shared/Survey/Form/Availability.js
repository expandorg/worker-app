import React from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';
import { Field } from './Form';

import { useDropdown, useStopPropagation } from './hooks';

export default function Availability({ profile, onChange, availability }) {
  const [value, change, select, autocomplete, filterFn] = useDropdown(
    profile,
    availability,
    onChange,
    'availability'
  );
  const keyDown = useStopPropagation();

  return (
    <Field title="How much time do you have to do tasks per week?">
      <AutocompleteInput
        onKeyDown={keyDown}
        value={value}
        placeholder="Hours per week"
        options={autocomplete}
        onChange={change}
        onSelect={select}
        filterFn={filterFn}
      />
    </Field>
  );
}

Availability.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  availability: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
