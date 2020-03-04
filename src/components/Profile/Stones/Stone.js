import React from 'react';
import PropTypes from 'prop-types';

import styles from './Stone.module.styl';

export default function Stone({ stone }) {
  console.log(stone);
  return <div className={styles.container} />;
}

Stone.propTypes = {
  stone: PropTypes.shape({}).isRequired,
};
