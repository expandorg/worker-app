import React from 'react';
import PropTypes from 'prop-types';
import general from '../styles/General.module.styl';
import styles from './Answers.module.styl';
import Modal from './modal';

class YesNoAnswers extends React.Component {
  static propTypes = {
    answers: PropTypes.objectOf(PropTypes.string).isRequired,
    tries: PropTypes.number.isRequired,
    questionText: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.getListQuestions = this.getListQuestions.bind(this);
    console.log('Props YesNo component', this.props.answers, this.props.tries);
    this.state = {
      isOpen: false,
      answerTruthy: null,
      modalType: null,
    };
  }
  getListQuestions(value) {
    console.log('value', value);
    const answer = {
      tries: 4,
      truthy: false,
    };
    const checkTruthy = answer.truthy;
    if (!checkTruthy) {
      this.setState({
        isOpen: true,
        modalType: 0,
      });
    }
    this.setState({
      answerTruthy: answer,
    });
  }
  render() {
    return (
      <div className="">
        <p className={styles.phDarkGrey}>{this.props.questionText}</p>
        <div className={styles.btnYesNoBox}>
          <button
            className={general.btnTrans}
            onClick={() => this.getListQuestions(true)}
          >Yes
          </button>
          <button
            className={general.btnTrans}
            onClick={() => this.getListQuestions(false)}
          >No
          </button>
        </div>
        <Modal
          show={this.state.isOpen}
          type={this.state.modalType}
          answer={this.state.answerTruthy}
        />
      </div>
    );
  }
}
export default YesNoAnswers;
