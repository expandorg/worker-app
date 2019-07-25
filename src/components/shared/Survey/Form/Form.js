import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import styles from './Form.module.styl';

export function Field({ children, title }) {
  return (
    <div className={styles.form}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.field}>{children}</div>
    </div>
  );
}

Field.propTypes = {
  title: PropTypes.string.isRequired,
};

export function Form({ onNext, onBack, children, nextTitle }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
      <div className={styles.actions}>
        {onBack && (
          <Button theme="secondary" onClick={onBack}>
            Back
          </Button>
        )}
        <Button onClick={onNext}>{nextTitle}</Button>
      </div>
    </div>
  );
}

Form.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  nextTitle: PropTypes.string.isRequired,
};

Form.defaultProps = {
  onBack: null,
};
