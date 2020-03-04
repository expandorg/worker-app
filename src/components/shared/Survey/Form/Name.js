import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '@expandorg/components';
import { Field } from './Form';
import { useStopPropagation } from './hooks';

export default function Name({ profile, onChange }) {
  const keyDown = useStopPropagation();
  return (
    <Field title="With a bit of info from you, we can do a better job matching you up with jobs & save you some time. Let's start with your name.">
      <Input
        onKeyDown={keyDown}
        tabIndex="0"
        placeholder="Your name"
        value={profile.name}
        onChange={({ target }) => onChange({ ...profile, name: target.value })}
      />
    </Field>
  );
}

Name.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
