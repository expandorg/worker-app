import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import PlacesAutocomplete from 'react-places-autocomplete';

import AutocompleteInput from './AutocompleteInput';
import Suggestions from './Suggestions';

import withScript from '../withScript';

const googlePlaces = 'https://maps.googleapis.com/maps/api/js?libraries=places';

class AutocompletePlaces extends Component {
  static propTypes = {
    value: PropTypes.string,
    jsLoaded: PropTypes.bool.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: '',
    className: null,
  }

  render() {
    const {
      className, value, onChange, jsLoaded, ...rest
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
            <input
              {...props.getInputProps({ className: 'gem-autocomplete-input', ...rest })}
            />
            {props.suggestions.length > 0 &&
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

export default withScript(
  `${googlePlaces}&key=AIzaSyC_tVILLYrsPVZbJxBbJmJyxiC6vG9CB0I`,
)(AutocompletePlaces);
