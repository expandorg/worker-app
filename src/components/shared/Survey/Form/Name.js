import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '@expandorg/components';

import styles from './styles.module.styl';

export default function Name({ profile, onChange }) {
  return (
    <div className={styles.field}>
      <Input
        className={styles.input}
        placeholder="Your name"
        value={profile.name}
        onChange={({ target }) => onChange({ ...profile, name: target.value })}
      />
    </div>
  );
}

Name.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
