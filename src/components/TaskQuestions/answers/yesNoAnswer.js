import React from 'react';
import PropTypes from 'prop-types';
// import { gemsService } from '../../../services/';
import styles from '../Question.module.styl';
import Modal from './modalWrongAnswer';

class YesNoAnswers extends React.Component {
  static propTypes = {
    questions: PropTypes.objectOf(PropTypes.string).isRequired,
  };
  constructor(props) {
    super(props);
    this.getListQuestions = this.getListQuestions.bind(this);
    console.log(this.props.questions);
    this.state = {
      isOpen: false,
      answerTruthy: null,
    };
  }
  getListQuestions(i) {
    const answer = {
      tries: 4,
      truthy: false,
    };
    const checkTruthy = answer.truthy;
    if (!checkTruthy) {
      this.setState({
        isOpen: true,
      });
    }
    this.setState({
      answerTruthy: answer,
    });
  }
  render() {
    return (
      <div className="btn-box">
        <div class="btn-box yesNo">
          <button class={styles.btnTrans} onClick={this.getListQuestions}>Yes</button>
          <button  class={styles.btnPink} onClick={this.getListQuestions}>No</button>
        </div>
        <Modal
          show={this.state.isOpen}
          onClose={this.closeModal}
          answer={this.state.answerTruthy}
        />  
      </div>
    )
  }
}
export default YesNoAnswers;