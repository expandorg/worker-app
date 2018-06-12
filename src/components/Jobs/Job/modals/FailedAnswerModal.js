import React, { Component } from 'react';
import PropTypes from 'prop-types';

import general from '../styles/General.module.styl';
import styles from './Answers.module.styl';

class FailedAnswerModal extends Component {
  static propTypes = {
    confirm: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    tries: PropTypes.number.isRequired,
  };

  render() {
    return (
      <div className={styles.backdropStyle}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <h3>Answers</h3>
          </div>
          <div className={styles.modalBody}>
            <h4>Sorry wrong answer</h4>
            <p className={general.phWhiteGrey}>
              Nullam maximuseu nisl sed sollicitudin.
              Nulla sit amet cursus quam, in bibendum felis.
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
              Lorem ipsum dolor sit amet  Lorem ipsum dolor sit amet
            </p>
            <h5><span>{this.props.tries}</span>tries left</h5>
          </div>
          <div className={styles.modalFooter}>
            <button className={general.btnPink} onClick={this.props.cancel}>Give up</button>
            <button className={general.btnPinkTrans} onClick={this.props.confirm}>Try again</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FailedAnswerModal;
