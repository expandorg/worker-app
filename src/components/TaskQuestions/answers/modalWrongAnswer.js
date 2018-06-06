import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Question.module.styl';

class Modal extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
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
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <h3>Answers</h3>
          </div>
          <div className={styles.modalBody}>
            <h4>Sory wrong answer</h4>
            <p className={styles.phWhiteGrey}>
              Nullam maximuseu nisl sed sollicitudin.
              Nulla sit amet cursus quam, in bibendum felis.
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
              Lorem ipsum dolor sit amet  Lorem ipsum dolor sit amet
            </p>
            <h5><span>{this.props.answer.tries}</span>tries left</h5>
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.btnPink}>Give up</button>
            <button className={styles.btnPinkTrans}>Try again</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
