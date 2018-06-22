import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import styles from './TextField.module.styl';
// import { TaskFieldType } from '../../../model/enums';

export default class ButtonField extends PureComponent {
  static propTypes = {
    field: PropTypes.shape({
    }).isRequired,
    value: PropTypes.shape({
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.any, // eslint-disable-line
  };

  selected = (key) => {
    this.props.onChange(key);
  }
  render() {
    const { field, value, className } = this.props;
    return (
      <button
        className={className}
        key={field.type}
        onClick={() => this.selected(value.key)}
      >
        <span>{value.key}</span>
        {value.label ?
          <span>{value.label}</span> : null}
      </button>
    );
  }
}
