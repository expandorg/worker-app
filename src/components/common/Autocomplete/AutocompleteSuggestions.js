import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './AutocompleteInput.styl';

const Suggestion = ({ value, onSelect }) => (
  <button className="gem-autocomplete-suggestion" onClick={() => onSelect(value)}>
    {value}
  </button>
);

Suggestion.propTypes = {
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default class AutocompleteSuggestions extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func.isRequired,
  }

  static defaultProps = {
    search: '',
    options: [],
  }

  render() {
    const { options, onSelect } = this.props;
    return (
      <div className="gem-autocomplete-suggestions">
        {options.map(opt => (
          <Suggestion key={opt} value={opt} onSelect={onSelect} />
        ))}
      </div>
    );
  }
}
