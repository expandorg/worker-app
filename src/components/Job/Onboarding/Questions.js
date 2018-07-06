import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { answerProps, questionProps } from '../../shared/propTypes';

import Container from './shared/Container';
import styles from './Questions.module.styl';

import Field from '../../Task/form/Field';

import FailedMessage from './shared/FailedMessage';
import SuccessMessage from './shared/SuccessMessage';

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
    showFailedMessage: false,
    showSuccessMessage: false,
    showRulesModal: false,
    showInstructionModal: false,
    checked: false,
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
  }

  setAnswer = (key) => {
    if (key) {
      this.setState({ checked: true });
    }
    this.setState({ answered: key });
  }
  cancelTest = () => {
    this.props.cancelTest(this.state.index);
  };

  goToNext = () => {
    this.setState({ checked: false });
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
  render() {
    const aqua = styles.btnAqua;
    const disabledBtn = styles.btnDisabledSmall;
    const itemLenght = this.props.question.data.questions.length;
    const { status } = this.props.answer;
    const question = this.props.question.data.questions[this.state.index];
    const {
      showFailedMessage, showSuccessMessage, showRulesModal, showInstructionModal,
      checked,
    } = this.state;
    return (
      <div>
        <div>
          {status === 0 && !showFailedMessage && !showSuccessMessage ?
            <div>
              <div className={styles.questionHeader}>
                <div className={styles.headerHeading}>
                  <button className={styles.btnPink}>Read article</button>
                  <h5>Read article and answer questions!</h5>
                </div>
                <div className={styles.questInfo}>
                  <div className={styles.col1}>
                    <h4>
                      <span>{this.state.index + 1} / {itemLenght}</span> questions
                    </h4>
                  </div>
                  {/* <div className={custom.col2}>
                    <h4>
                      <span>{remaining}</span>tries left
                    </h4>
                  </div> */}
                </div>
              </div>
              <Container>
                <p className={styles.phDarkGrey}>{question.description}</p>
                {question.fields.map(field =>
                  (<Field
                    key={field.type}
                    field={field}
                    onChange={this.setAnswer}
                  />))}
                <div>
                  <button
                    className={checked ? aqua : disabledBtn}
                    onClick={this.goToNext}
                    disabled={!this.state.checked}
                  >
                    <span>Next <small>&rsaquo;</small></span>
                  </button>
                </div>
                <div className={styles.taskLinks}>
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
              </Container>
            </div> : null}
          {showSuccessMessage || status === 1 ?
            <SuccessMessage
              confirm={this.props.finishedTest}
              pointsWon={this.props.answer.points}
            /> : null}
          {showFailedMessage || status === 2 ?
            <FailedMessage
              confirm={this.props.abandon}
              pointsNedded={this.props.question.points_needed}
              pointsWon={this.props.answer.points}
            /> : null}
        </div>
      </div>
    );
  }
}
export default Questions;
