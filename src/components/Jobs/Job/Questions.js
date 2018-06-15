import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { answerProps, questionProps } from '../../shared/propTypes';

import styles from './styles/General.module.styl';
import custom from './styles/Custom.module.styl';

import TwoColumsAnswers from './components/TwoColumAnswer';
import OneColumsAnswers from './components/OneColumAnswer';
import YesNoAnswers from './components/YesNoAnswer';

import FailedAnswerModal from './modals/FailedAnswerModal';
import FailedTestMessage from './components/FailedTestMessage';
import SuccessTestMessage from './components/SuccessTestMessage';

import RulesModal from './modals/RulesModal';
import QuestionInstructionModal from './modals/QuestionInstructionModal';

class Questions extends Component {
  static propTypes = {
    answer: PropTypes.shape(answerProps).isRequired,
    question: PropTypes.shape(questionProps).isRequired,
    postAnswer: PropTypes.func.isRequired,
    cancelTest: PropTypes.func.isRequired,
    finishedTest: PropTypes.func.isRequired,
    abandon: PropTypes.func.isRequired,
  };

  state = {
    index: this.props.answer.answers.length,
    showErrorModal: false,
    showFailedMessage: false,
    showSuccessMessage: false,
    showRulesModal: false,
    showInstructionModal: false,
  };

  componentWillReceiveProps({ answer: nextAnswer }) {
    const { answer } = this.props;
    if (nextAnswer.status === 1) {
      this.setState({ showSuccessMessage: true });
    } else if (nextAnswer.status === 2) {
      this.setState({ showFailedMessage: true });
    }
    if (answer.answers.length !== nextAnswer.answers.length) {
      this.setState({ index: nextAnswer.answers.length });
    }
    if (answer.fails !== nextAnswer.fails) {
      this.setState({ showErrorModal: true });
    }
  }

  setAnswer = (key) => {
    this.setState({ answered: key });
  }

  cancelTest = () => {
    this.props.cancelTest(this.state.index);
  };

  goToNext = () => {
    this.props.postAnswer(this.state.answered, this.state.index);
  };

  openRulesModal = () => {
    this.setState({ showRulesModal: true });
  }
  closeRulesModal = () => {
    this.setState({ showRulesModal: false });
  }
  openInstructionModal = () => {
    this.setState({ showInstructionModal: true });
  }
  closeInstructionModal = () => {
    this.setState({ showInstructionModal: false });
  }
  renderQuestion = () => {
    const item = this.props.question.data.questions[this.state.index];
    let template;
    switch (item.type) {
      case 1:
        template = (
          <OneColumsAnswers
            answers={item.answers}
            text={item.text}
            answered={this.setAnswer}
          />
        );
        break;
      case 2:
        template = (
          <TwoColumsAnswers
            answers={item.answers}
            text={item.text}
            answered={this.setAnswer}
          />);
        break;
      case 3:
        template = (
          <YesNoAnswers
            answered={this.setAnswer}
            text={item.text}
          />
        );
        break;
      default: {
        template = null;
      }
    }
    return template;
  }

  render() {
    const itemLenght = this.props.question.data.questions.length;
    const { remaining, status } = this.props.answer;
    const {
      showFailedMessage, showSuccessMessage, showErrorModal, showRulesModal, showInstructionModal,
    } = this.state;
    return (
      <div>
        <div>
          {status === 0 && !showFailedMessage && !showSuccessMessage ?
            <div>
              <div className={custom.questionHeader}>
                <div className={custom.headerHeading}>
                  <button className={styles.btnPink}>Read article</button>
                  <h5>Read article and answer questions!</h5>
                </div>
                <div className={custom.questInfo}>
                  <div className={custom.col1}>
                    <h4>
                      <span>{this.state.index + 1} / {itemLenght}</span> questions
                    </h4>
                  </div>
                  <div className={custom.col2}>
                    <h4>
                      <span>{remaining}</span>tries left
                    </h4>
                  </div>
                </div>
              </div>
              <div className={styles.taskContainer}>
                {this.renderQuestion()}
                <div>
                  <button className={styles.btnAqua} onClick={this.goToNext}>
                    <span>Next <small>&rsaquo;</small></span>
                  </button>
                </div>
                <div className={custom.taskLinks}>
                  <span
                    onClick={this.openRulesModal}
                    onKeyDown={this.openRulesModal}
                    role="button"
                    tabIndex={-1}
                  > See rules
                  </span> |
                  <span
                    onClick={this.openInstructionModal}
                    onKeyDown={this.openInstructionModal}
                    role="button"
                    tabIndex={-1}
                  > See instructions
                  </span>
                </div>
                {showRulesModal ? <RulesModal confirm={this.closeRulesModal} /> : null}
                {showInstructionModal ?
                  <QuestionInstructionModal confirm={this.closeInstructionModal} /> : null}
                {showErrorModal ?
                  <FailedAnswerModal
                    confirm={() => this.setState({ showErrorModal: false })}
                    cancel={this.cancelTest}
                    tries={remaining}
                  /> : null}
              </div>
            </div> : null}
          {showSuccessMessage || status === 1 ?
            <SuccessTestMessage
              confirm={this.props.finishedTest}
              cancel={this.props.abandon}
            /> : null}
          {showFailedMessage || status === 2 ?
            <FailedTestMessage
              confirm={this.props.abandon}
            /> : null}
        </div>
      </div>
    );
  }
}
export default Questions;
