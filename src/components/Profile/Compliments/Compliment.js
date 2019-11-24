import React from 'react';
import PropTypes from 'prop-types';

import format from 'date-fns/format';
import parse from 'date-fns/parse';

import { ReactComponent as PersonIcon } from './person.svg';

import styles from './Compliment.module.styl';

export default function Compliment({ compliment }) {
  return (
    <div className={styles.container}>
      <div className={styles.autor}>
        <PersonIcon className={styles.person} />
        <div className={styles.name}>{compliment.autor}</div>
        <div className={styles.date}>
          {format(parse(compliment.createDate), 'MM/DD/YYYY')}
        </div>
      </div>
      <div className={styles.title}>{compliment.title}</div>
      <div className={styles.text}>{compliment.text}</div>
    </div>
  );
}

Compliment.propTypes = {
  compliment: PropTypes.shape({
    autor: PropTypes.string,
    createDate: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};
