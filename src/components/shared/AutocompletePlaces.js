import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import PlacesAutocomplete from 'react-places-autocomplete';

import { AutocompleteInput, Suggestions, ServiceLocator, Input } from '@gemsorg/components';
import { withScript, withServices } from '@gemsorg/components/hoc';

import settings from '../../common/settings';

import withCurrentLocation from './withCurrentLocation';

const googlePlaces = 'https://maps.googleapis.com/maps/api/js?libraries=places&language=en';

class AutocompletePlaces extends Component {
  static propTypes = {
    value: PropTypes.string,
    latLng: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
    services: PropTypes.instanceOf(ServiceLocator).isRequired,
    jsLoaded: PropTypes.bool.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: '',
    latLng: null,
    className: null,
  }

  componentDidMount() {
    this.tryGetCurrentCity();
    const { value, onChange, latLng, services } = this.props;

    if (!value && latLng) {
      const reverseGeocoder = services.resolve('reverseGeocoder');
      const city = reverseGeocoder.getCity(latLng.lat, latLng.lng);
      if (city) {
        onChange(city);
      }
    }
  }

  componentDidUpdate({ latLng: prevLatLng, jsLoaded: prevLoaded }) {
    const { jsLoaded, latLng } = this.props;
    if ((jsLoaded && !prevLoaded && latLng) || (latLng && !prevLatLng && jsLoaded)) {
      this.tryGetCurrentCity();
    }
  }

  componentWillUnmount() {
    if (this.unsibscribe) {
      this.unsibscribe();
    }
  }

  tryGetCurrentCity() {
    const { jsLoaded, latLng, services } = this.props;
    if (latLng && jsLoaded) {
      const reverseGeocoder = services.resolve('reverseGeocoder');
      this.unsibscribe = reverseGeocoder.locateCity(latLng.lat, latLng.lng, this.handleCurrentCity);
    }
  }

  handleCurrentCity = (city) => {
    if (!this.props.value) {
      this.props.onChange(city);
    }
  }

  render() {
    const {
      className, value, onChange, jsLoaded, latLng, ...rest
    } = this.props;
    if (!jsLoaded) {
      return (
        <AutocompleteInput
          className={className}
          value={value}
          onChange={({ target }) => onChange(target.value)}
          {...rest}
        />
      );
    }
    return (
      <PlacesAutocomplete value={value} onChange={onChange}>
        {props => (
          <div className={cn('gem-autocomplete', className)}>
            <Input
              {...props.getInputProps({ className: 'gem-autocomplete-input', ...rest })}
            />
            {props.suggestions.length !== 0 &&
              <Suggestions>
                {props.suggestions.map(suggestion => (
                  <div {...props.getSuggestionItemProps(suggestion, { className: 'gem-autocomplete-suggestion' })} >
                    <span>{suggestion.description}</span>
                  </div>
                ))}
              </Suggestions>
            }
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default withScript(`${googlePlaces}&key=${settings.googleMapsKey}`)(
  withCurrentLocation(withServices(AutocompletePlaces)),
);
