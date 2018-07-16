import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Alignment from '../../../../shared/form/ui/Alignment';

import styles from './Task.module.styl';

export default class Task extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
  };

  render() {
    const { link,
    } = this.props;
    return (
      <Alignment padding="medium" vCenter>
        <a className={styles.link} href={link} target="_blank" rel="noopener noreferrer" >
          Read article
        </a>
        <p className={styles.p}>
          Read article and answer the questions!
        </p>
      </Alignment>
    );
  }
}
