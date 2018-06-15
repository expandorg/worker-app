import React, { Component } from 'react';
import PropTypes from 'prop-types';

import general from '../styles/General.module.styl';
import styles from './Answers.module.styl';

class QuestionInstructionModal extends Component {
  static propTypes = {
    confirm: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={styles.backdropStyle}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <h3>Instructions</h3>
          </div>
          <div className={styles.modalBody}>
            <h4>Read task instructions here!</h4>
            <p className={general.phWhiteGrey}>
              Your task will be to read Medium articles that have recently been
              published and decide if the articles pass Medium’s Quality Control
              Guidelines.  If the article passes the guidelines you will click accept.
              While reading the article if you see it fails a guideline,
              stop reading and click reject.
            </p>
          </div>
          <div className={styles.modalFooter}>
            <button className={general.btnPink} onClick={this.props.confirm}>OK</button>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionInstructionModal;
