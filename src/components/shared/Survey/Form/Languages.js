import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';

import Tags from './Tags';

import styles from './styles.module.styl';

export const languages = [
  'English',
  'Spanish',
  'Russian',
  'Chinese',
  'Arabic',
  'Portuguese',
  'Japanese',
  'German',
  'French',
];

export default function Languages({ profile, onChange }) {
  const [suggest, setSuggest] = useState('');

  const handleSelect = useCallback(
    lang => {
      setSuggest('');
      if (lang) {
        onChange({
          ...profile,
          languages: [...new Set(profile.languages.concat(lang))],
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
        placeholder="Languages"
        options={languages}
        onChange={({ target }) => setSuggest(target.value)}
        onSelect={handleSelect}
      />
      {profile.languages.length > 0 && (
        <Tags
          tags={profile.languages}
          onDelete={lang =>
            onChange({
              ...profile,
              languages: profile.languages.filter(v => v !== lang),
            })
          }
        />
      )}
    </div>
  );
}

Languages.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
