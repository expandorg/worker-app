import React from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';

import { useAutocomplete } from './hooks';
import Tags from './Tags';
import { Field } from './Form';

export default function Interests({ profile, onChange, interests }) {
  const [
    suggest,
    change,
    select,
    deselect,
    autocomplete,
    seleted,
  ] = useAutocomplete(profile, interests, onChange, 'interests');

  return (
    <Field title="What is your interests?">
      <AutocompleteInput
        theme="white"
        value={suggest}
        placeholder="Your interests"
        options={autocomplete}
        onChange={change}
        onSelect={select}
      />
      {seleted.length > 0 && <Tags tags={seleted} onDelete={deselect} />}
    </Field>
  );
}

Interests.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  interests: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
