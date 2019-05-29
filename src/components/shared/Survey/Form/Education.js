import React from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';

import styles from './styles.module.styl';

const educations = [
  'No schooling completed',
  'Nursery school to 8th grade',
  'Some high school, no diploma',
  'High school graduate, diploma or the equivalent (for example: GED)',
  'Some college credit, no degree',
  'Trade/technical/vocational training',
  'Associate degree',
  'Bachelor’s degree',
  'Master’s degree',
  'Professional degree',
  'Doctorate degree',
];

export default function Education({ profile, onChange }) {
  return (
    <div className={styles.field}>
      <AutocompleteInput
        className={styles.autocomplete}
        value={profile.education}
        placeholder="Education level"
        options={educations}
        onChange={({ target }) =>
          onChange({ ...profile, education: target.value })
        }
        onSelect={education => onChange({ ...profile, education })}
      />
    </div>
  );
}

Education.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
