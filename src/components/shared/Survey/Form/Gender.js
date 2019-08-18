import React from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';
import { Field } from './Form';

import { useDropdown, useStopPropagation } from './hooks';

export default function Gender({ profile, onChange, genders }) {
  const [value, change, select, autocomplete, filterFn] = useDropdown(
    profile,
    genders,
    onChange,
    'gender'
  );
  const keyDown = useStopPropagation();

  return (
    <Field title="What is your gender?">
      <AutocompleteInput
        onKeyDown={keyDown}
        value={value}
        theme="white"
        placeholder="Your gender"
        options={autocomplete}
        onChange={change}
        onSelect={select}
        filterFn={filterFn}
      />
    </Field>
  );
}

Gender.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  genders: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
