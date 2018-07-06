import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from './shared/Container';
import styles from './Decription.module.styl';
import { jobProps } from '../../shared/propTypes';

class Description extends Component {
  static propTypes = {
    job: PropTypes.shape(jobProps).isRequired,
    next: PropTypes.func.isRequired,
  };

  render() {
    const { job } = this.props;
    return (
      <Container>
        <h3>Task</h3>
        <p className={styles.phWhiteGrey}>{job ? job.description : ''}</p>
        <div className={styles.btnBoxTask}>
          <button
            className={styles.btnPink}
            onClick={this.props.next}
          >
            Proceed to rules
          </button>
        </div>
      </Container>
    );
  }
}
export default Description;
