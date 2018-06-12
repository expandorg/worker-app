import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles/General.module.styl';
import custom from './styles/Custom.module.styl';

import { jobProps } from '../../shared/propTypes';

class Description extends Component {
  static propTypes = {
    job: PropTypes.shape(jobProps).isRequired,
    next: PropTypes.func.isRequired,
  };

  render() {
    const { job } = this.props;
    return (
      <div>
        <div className={styles.taskContainer}>
          <h3>Task</h3>
          <p className={styles.phWhiteGrey}>{job ? job.description : ''}</p>
          <div className={custom.btnBoxTask}>
            <button
              className={styles.btnPink}
              onClick={this.props.next}
            >
              Proceed to rules
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Description;
