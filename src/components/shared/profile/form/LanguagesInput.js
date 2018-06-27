import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutocompleteInput from '../../../common/Autocomplete/AutocompleteInput';
import Tags from './Tags';

import { languages } from '../../../../model/onboarding';

import styles from './LanguagesInput.module.styl';

export default class LanguagesInput extends Component {
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

  handleSelect = (lang) => {
    const { value, onChange } = this.props;
    onChange([...new Set(value.concat(lang))]);
    this.setState({ suggest: '' });
  }

  handleDelete = (lang) => {
    const { value, onChange } = this.props;
    onChange(value.filter(v => v !== lang));
  }

  render() {
    const { value } = this.props;
    const { suggest } = this.state;
    return (
      <div className={styles.container}>
        <AutocompleteInput
          className={styles.input}
          value={suggest}
          placeholder="Start typing..."
          allowAdd
          clear
          options={languages}
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
