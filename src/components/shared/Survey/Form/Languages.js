import React from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';

import { useAutocomplete } from '../profile';

import Tags from './Tags';

import styles from './styles.module.styl';

export default function Languages({ profile, onChange, languages }) {
  const [
    suggest,
    change,
    select,
    deselect,
    autocomplete,
    seleted,
  ] = useAutocomplete(profile, languages, onChange, 'languages');

  return (
    <div className={styles.field}>
      <AutocompleteInput
        className={styles.autocomplete}
        value={suggest}
        placeholder="Languages"
        options={autocomplete}
        onChange={change}
        onSelect={select}
      />
      {seleted.length > 0 && <Tags tags={seleted} onDelete={deselect} />}
    </div>
  );
}

Languages.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  languages: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
