import React from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';
import { Field } from './Form';

import { useDropdown, useStopPropagation } from './hooks';

export default function Education({ profile, onChange, education }) {
  const [value, change, select, autocomplete, filterFn] = useDropdown(
    profile,
    education,
    onChange,
    'education'
  );
  const keyDown = useStopPropagation();

  return (
    <Field title="What is your education?">
      <AutocompleteInput
        onKeyDown={keyDown}
        value={value}
        placeholder="Education level"
        options={autocomplete}
        onChange={change}
        onSelect={select}
        filterFn={filterFn}
      />
    </Field>
  );
}

Education.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  education: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
