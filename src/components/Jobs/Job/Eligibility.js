import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles/General.module.styl';
import custom from './styles/Custom.module.styl';
import taskImg from '../../../../public/images/complete-tasks.png';

class Eligibility extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={custom.boxEligibility}>
        <div className={styles.taskContainer}>
          <h3>Eligibility</h3>
          <p className={styles.phWhiteGrey}>
            To be eligible for this task you will have to pass a test
            to show you understand the task and can complete it with both
            accuracy and speed. There are 13 questions in this test. Do not
            share the contents of the test or the answers with anyone.
            To ensure there is no sharing, the articles chosen for
            this test will be randomized.You will have 2 tries
            to score 100% on the test. The test is not paid.
          </p>
          <div className={custom.imgBox}>
            <img src={taskImg} alt="" />
          </div>
          <div className={custom.btnEglibilitbox}>
            <button
              className={styles.btnPink}
              onClick={this.props.next}
            >Begin the eligibility test now
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Eligibility;

