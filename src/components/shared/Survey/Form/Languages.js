import React from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';

import { useAutocomplete, useStopPropagation } from './hooks';

import Tags from './Tags';
import { Field } from './Form';

export default function Languages({ profile, onChange, languages }) {
  const [
    suggest,
    change,
    select,
    deselect,
    autocomplete,
    seleted,
  ] = useAutocomplete(profile, languages, onChange, 'languages');

  const keyDown = useStopPropagation();

  return (
    <Field title="What languages do you know?">
      <AutocompleteInput
        onKeyDown={keyDown}
        className="gem-autocomplete-multi"
        value={suggest}
        placeholder="Languages"
        options={autocomplete}
        onChange={change}
        onSelect={select}
      />
      {seleted.length > 0 && <Tags tags={seleted} onDelete={deselect} />}
    </Field>
  );
}

Languages.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
