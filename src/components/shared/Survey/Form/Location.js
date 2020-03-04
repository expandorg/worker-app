import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useService, AutocompleteInput } from '@expandorg/components';

import useCurrentLocation from '../../useCurrentLocation';

import { useStopPropagation } from './hooks';
import { Field } from './Form';

const getAddressString = profile =>
  [profile.city, profile.locality, profile.country].filter(c => !!c).join(', ');

const noop = p => p;

export default function Location({ profile, onChange }) {
  const services = useService();

  const geocoder = services.resolve('geocoder');

  const [value, setValue] = useState(getAddressString(profile));
  const [autocomplete, setAutocomplete] = useState([]);

  const placesRef = useRef([]);

  const loc = useCurrentLocation();
  useEffect(() => {
    if (loc && !profile.city) {
      geocoder.reverseGeocodeCity(loc.lat, loc.lng).then(places => {
        placesRef.current = places;
        setAutocomplete(places.map(p => p.place_name));
      });
    }
  }, [geocoder, loc, profile.city]);

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

  const keyDown = useStopPropagation();

  return (
    <Field title="Your country and city of residence.">
      <AutocompleteInput
        onKeyDown={keyDown}
        value={value}
        options={autocomplete}
        placeholder="City, State, Country"
        onChange={change}
        onSelect={select}
        filterFn={noop}
      />
    </Field>
  );
}

Location.propTypes = {
  profile: PropTypes.shape({
    city: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
