import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AutocompleteInput } from '@gemsorg/components';

import Tags from './Tags';

export default class InterestsInput extends Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: [],
  }

  state = {
    suggest: '',
  }

  handleChange = ({ target }) => {
    this.setState({ suggest: target.value });
  }

  handleSelect = (topic) => {
    this.setState({ suggest: '' });
    if (topic) {
      const { value, onChange } = this.props;
      onChange([...new Set(value.concat(topic))]);
    }
  }

  handleDelete = (lang) => {
    const { value, onChange } = this.props;
    onChange(value.filter(v => v !== lang));
  }

  render() {
    const { value } = this.props;
    const { suggest } = this.state;
    return (
      <div>
        <AutocompleteInput
          value={suggest}
          placeholder="Start typing to add..."
          allowAdd
          clear
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        />
        {value.length > 0 &&
          <Tags tags={value} onDelete={this.handleDelete} />
        }
      </div>
    );
  }
}
