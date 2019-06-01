import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';

import Tags from './Tags';

import styles from './styles.module.styl';

export const languages = [];

export default function Interests({ profile, onChange }) {
  const [suggest, setSuggest] = useState('');

  const handleSelect = useCallback(
    lang => {
      setSuggest('');
      if (lang) {
        onChange({
          ...profile,
          interests: [...new Set(profile.interests.concat(lang))],
        });
      }
    },
    [onChange, profile]
  );

  return (
    <div className={styles.field}>
      <AutocompleteInput
        className={styles.autocomplete}
        value={suggest}
        allowAdd
        placeholder="Your interests"
        options={languages}
        onChange={({ target }) => setSuggest(target.value)}
        onSelect={handleSelect}
      />
      {profile.interests.length > 0 && (
        <Tags
          tags={profile.interests}
          onDelete={lang =>
            onChange({
              ...profile,
              interests: profile.interests.filter(v => v !== lang),
            })
          }
        />
      )}
    </div>
  );
}

Interests.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
