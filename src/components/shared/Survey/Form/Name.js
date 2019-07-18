import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '@expandorg/components';
import { Field } from './Form';

import styles from './styles.module.styl';

export default function Name({ profile, onChange }) {
  return (
    <Field title="Let’s get you all set up with just a few questions starting off with your name.">
      <Input
        className={styles.input}
        placeholder="Your name"
        value={profile.name}
        onChange={({ target }) => onChange({ ...profile, name: target.value })}
      />
    </Field>
  );
}

Name.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
