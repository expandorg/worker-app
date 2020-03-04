import React from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';

import { useAutocomplete, useStopPropagation } from './hooks';
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

  const keyDown = useStopPropagation();

  return (
    <Field title="What is your interests?">
      <AutocompleteInput
        onKeyDown={keyDown}
        value={suggest}
        className="gem-autocomplete-multi"
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
