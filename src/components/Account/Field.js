import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as EditIcon } from '@expandorg/uikit/assets/edit-2.svg';

import styles from './Field.module.styl';

export default function Field({
  title,
  value,
  placeholder,
  children,
  onToggle,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>
          <div className={styles.text}>{value || placeholder}</div>
          {children}
        </div>
      </div>
      <button className={styles.edit} onClick={onToggle}>
        <EditIcon />
      </button>
    </div>
  );
}

Field.propTypes = {
  title: PropTypes.string,
  value: PropTypes.any, //  eslint-disable-line react/forbid-prop-types
  placeholder: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
};

Field.defaultProps = {
  title: '',
  value: null,
  placeholder: null,
};
