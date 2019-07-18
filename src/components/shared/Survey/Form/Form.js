import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import styles from './Form.module.styl';

export default function Form({ onNext, onBack, title, children, nextTitle }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.form}>
          <h2 className={styles.title}>{title}</h2>
          {children}
        </div>
      </div>
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
  title: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  nextTitle: PropTypes.string.isRequired,
};

Form.defaultProps = {
  onBack: null,
};
