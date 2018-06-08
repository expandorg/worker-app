import React from 'react';
import PropTypes from 'prop-types';
import general from '../styles/General.module.styl';
import styles from './Answers.module.styl';

class Modal extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    type: PropTypes.number.isRequired,
    answer: PropTypes.shape({
      tries: PropTypes.number,
      truthy: PropTypes.bool,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    console.log('MODAL props', props);
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }
    return (
      <div className={styles.backdropStyle}>
        {this.props.type === 0 ?
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3>Answers</h3>
            </div>
            <div className={styles.modalBody}>
              <h4>Sory wrong answer</h4>
              <p className={general.phWhiteGrey}>
                Nullam maximuseu nisl sed sollicitudin.
                Nulla sit amet cursus quam, in bibendum felis.
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                Lorem ipsum dolor sit amet  Lorem ipsum dolor sit amet
              </p>
              <h5><span>{this.props.answer.tries}</span>tries left</h5>
            </div>
            <div className={styles.modalFooter}>
              <button className={general.btnPink}>Give up</button>
              <button className={general.btnPinkTrans}>Try again</button>
            </div>
          </div> : null}
        {this.props.type === 1 ?
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3>Task</h3>
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
              <button className={general.btnPink}>OK</button>
            </div>
          </div> : null}
        {this.props.type === 2 ?
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3>Rules</h3>
            </div>
            <div className={styles.modalBody}>
              <h4>Rules!</h4>
              <p className={general.phWhiteGrey}>
                Your task will be to read Medium articles that have recently been
                published and decide if the articles pass Medium’s Quality Control
                Guidelines.  If the article passes the guidelines you will click accept.
                While reading the article if you see it fails a guideline,
                stop reading and click reject.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button className={general.btnPink}>OK</button>
            </div>
          </div> : null}
      </div>
    );
  }
}

export default Modal;
