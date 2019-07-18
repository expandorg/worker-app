import React from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@expandorg/components';
import { Field } from './Form';

import { useDropdown } from '../profile';

import styles from './styles.module.styl';

export default function Gender({ profile, onChange, genders }) {
  const [value, change, select, autocomplete, filterFn] = useDropdown(
    profile,
    genders,
    onChange,
    'gender'
  );
  return (
    <Field title="What is your gender?">
      <AutocompleteInput
        className={styles.autocomplete}
        value={value}
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
