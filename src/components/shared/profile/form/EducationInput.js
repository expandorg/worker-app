import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutocompleteInput from '../../../common/Autocomplete/AutocompleteInput';

import { educations } from '../../../../model/onboarding';

import styles from './EducationInput.module.styl';

export default class EducationInput extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: '',
  }

  handleChange = ({ target }) => {
    this.props.onChange(target.value);
  }

  handleSelect = (level) => {
    this.props.onChange(level);
  }

  render() {
    const { value } = this.props;
    return (
      <AutocompleteInput
        className={styles.input}
        value={value}
        placeholder="Education level"
        allowAdd
        clear
        options={educations}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      />
    );
  }
}
