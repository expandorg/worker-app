import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Down } from '@expandorg/uikit/assets/arrow-down.svg';

import cn from 'classnames';

import styles from './Sort.module.styl';

export default function Sort({ selected: sel, onSelect }) {
  const selected = sel || '-submission';
  const type = selected.slice(1);
  const sign = selected.slice(0, 1);

  const select = useCallback(
    option => {
      let result = `-${option}`;
      if (type === option && selected === `-${option}`) {
        result = `+${option}`;
      }
      onSelect(result);
    },
    [onSelect, selected, type]
  );

  const ts = type === 'token';
  const ss = type === 'submission';

  return (
    <div className={styles.container}>
      <button
        className={cn(styles.option, {
          [styles.selected]: ts,
          [styles.up]: ts && sign === '+',
        })}
        onClick={() => select('token')}
      >
        Tokens
        <Down className={styles.arrow} />
      </button>
      <button
        className={cn(styles.option, {
          [styles.selected]: ss,
          [styles.up]: ss && sign === '+',
        })}
        onClick={() => select('submission')}
      >
        Recent
        <Down className={styles.arrow} />
      </button>
    </div>
  );
}

Sort.propTypes = {
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

Sort.defaultProps = {
  selected: null,
};
