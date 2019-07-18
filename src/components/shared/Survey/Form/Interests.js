import React from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';

import { useAutocomplete } from '../profile';
import Tags from './Tags';

import styles from './styles.module.styl';

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
    <div className={styles.field}>
      <AutocompleteInput
        className={styles.autocomplete}
        value={suggest}
        placeholder="Your interests"
        options={autocomplete}
        onChange={change}
        onSelect={select}
      />
      {seleted.length > 0 && (
        <Tags tags={profile.interests} onDelete={deselect} />
      )}
    </div>
  );
}

Interests.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  interests: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};
