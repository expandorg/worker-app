import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Input,
  useScript,
  useService,
  Suggestions,
} from '@expandorg/components';
import PlacesAutocomplete from 'react-places-autocomplete';

import useCurrentLocation from '../../useCurrentLocation';

import settings from '../../../../common/settings';

import styles from './styles.module.styl';

const googlePlaces = `https://maps.googleapis.com/maps/api/js?libraries=places&language=en&key=${
  settings.googleMapsKey
}`;

function Location({ profile, onChange }) {
  const loc = useCurrentLocation();
  const loaded = useScript(googlePlaces);
  const services = useService();

  const [value, setValue] = useState(profile.location);

  useEffect(() => {
    let unsubscribe = null;
    if (loc && loaded) {
      console.log('services');

      const reverseGeocoder = services.resolve('reverseGeocoder');
      unsubscribe = reverseGeocoder.locateCity(loc.lat, loc.lng, city => {
        if (!profile.location) {
          onChange({ ...profile, location: city });
        }
      });
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [loc, loaded]);

  return (
    <div className={styles.field}>
      {loaded && (
        <PlacesAutocomplete
          value={value}
          onChange={setValue}
          onSelect={city => {
            setValue(city);
            onChange({ ...profile, location: city });
          }}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div className={cn('gem-autocomplete', styles.autocomplete)}>
              <Input
                {...getInputProps({
                  placeholder: 'Country, City',
                  className: 'gem-autocomplete-input',
                })}
              />
              {suggestions.length !== 0 && (
                <Suggestions>
                  {suggestions.map(suggestion => (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className: 'gem-autocomplete-suggestion',
                      })}
                    >
                      {suggestion.description}
                    </div>
                  ))}
                </Suggestions>
              )}
            </div>
          )}
        </PlacesAutocomplete>
      )}
    </div>
  );
}

Location.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Location;
