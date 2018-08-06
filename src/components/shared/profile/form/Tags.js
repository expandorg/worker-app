import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Tags.module.styl';

export const Tag = ({ value, onDelete }) => (
  <div className={styles.tag}>
    {value}
    <button className={styles.delete} onClick={onDelete}>
      ✕
    </button>
  </div>
);

Tag.propTypes = {
  value: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default class Tags extends Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    onDelete: PropTypes.func.isRequired,
  }
  static defaultProps = {
    tags: [],
  }

  render() {
    const { tags, onDelete } = this.props;
    return (
      <div className={styles.list}>
        {tags.map(v =>
          <Tag key={v} value={v} onDelete={() => onDelete(v)} />,
        )}
      </div>
    );
  }
}
