import React from 'react';
import PropTypes from 'prop-types';

import styles from './Tags.module.styl';

export default function Tags({ tags, onDelete }) {
  return (
    <div className={styles.list}>
      {tags.map(({ id, value }) => (
        <div key={value} className={styles.tag}>
          {value}
          <button className={styles.delete} onClick={() => onDelete(id)}>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func.isRequired,
};

Tags.defaultProps = {
  tags: [],
};
