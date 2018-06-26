import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AutocompelteInput from '../../common/Autocompelte/AutocompelteInput';

import languages from '../../../model/languages';

import styles from './LanguagesInput.module.styl';


const Lang = ({ lang, onDelete }) => (
  <div className={styles.lang}>
    {lang}
    <button className={styles.delete} onClick={onDelete}>
      ✕
    </button>
  </div>
);

Lang.propTypes = {
  lang: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

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
        <AutocompelteInput
          className={styles.input}
          value={suggest}
          placeholder="Start typing..."
          options={languages}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        />
        {value.length > 0 &&
          <div className={styles.list}>
            {value.map(lang =>
              <Lang key={lang} lang={lang} onDelete={() => this.handleDelete(lang)} />,
            )}
          </div>
        }
      </div>
    );
  }
}
