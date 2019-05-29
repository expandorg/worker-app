import React from 'react';
import PropTypes from 'prop-types';

import { Input, withScript } from '@expandorg/components';

import useCurrentLocation from '../../useCurrentLocation';

import settings from '../../../../common/settings';

import styles from './styles.module.styl';

const googlePlaces = `https://maps.googleapis.com/maps/api/js?libraries=places&language=en&key=${
  settings.googleMapsKey
}`;

function Location({ profile, onChange }) {
  const loc = useCurrentLocation();
  console.log(loc);

  return (
    <div className={styles.field}>
      <Input
        className={styles.input}
        placeholder="Country, City"
        value={profile.location}
        onChange={({ target }) =>
          onChange({ ...profile, location: target.value })
        }
      />
    </div>
  );
}

Location.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withScript(googlePlaces)(Location);
