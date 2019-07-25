import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import { useService, AutocompleteInput } from '@expandorg/components';

import { Field } from './Form';

const getAddressString = profile =>
  [profile.city, profile.locality, profile.country].filter(c => !!c).join(', ');

export default function Country({ profile, onChange }) {
  const services = useService();

  const geocoder = services.resolve('forwardGeocoder');

  const [value, setValue] = useState(getAddressString(profile));
  const [autocomplete, setAutocomplete] = useState([]);

  const placesRef = useRef([]);

  const change = useCallback(
    ({ target }) => {
      setValue(target.value);
      geocoder.suggestCity(target.value).then(places => {
        placesRef.current = places;
        setAutocomplete(places.map(p => p.place_name));
      });
    },
    [geocoder]
  );

  const select = useCallback(
    v => {
      setValue(v);
      const place = placesRef.current.find(p => p.place_name === v);
      if (place) {
        const address = geocoder.extractAddress(place);
        onChange({ ...profile, ...address });
      }
    },
    [geocoder, onChange, profile]
  );

  return (
    <Field title="Your country and city of residence.">
      <AutocompleteInput
        value={value}
        options={autocomplete}
        theme="white"
        placeholder="City, State, Country"
        onChange={change}
        onSelect={select}
      />
    </Field>
  );
}

Country.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};
