import React from 'react';
import PropTypes from 'prop-types';
import TwoColumsAnswers from './answers/twoColumAnswer';
import OneColumsAnswers from './answers/oneColumAnswer';
import styles from './styles/General.module.styl';
import custom from './styles/Custom.module.styl';
import YesNoAnswers from './answers/yesNoAnswer';
import Modal from './answers/modal';

class ListQuestions extends React.Component {
  static propTypes = {
    listQuestion: PropTypes.shape({
      questions: PropTypes.array,
      tries: PropTypes.number,
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      modalType: null,
      isOpen: false,
    };
    console.log('PROPS in LIst questions', props);
    this.goToNext = this.goToNext.bind(this);
    this.openRulesModal = this.openRulesModal.bind(this);
    this.openInstructionModal = this.openInstructionModal.bind(this);
  }
  goToNext = () => {
    this.setState({ index: this.state.index + 1 });
  };
  openRulesModal() {
    this.setState({
      modalType: 2,
      isOpen: true,
    });
  }
  openInstructionModal() {
    this.setState({
      modalType: 1,
      isOpen: true,
    });
  }
  renderQuestion(item, tries, questionLenght, curentLenght) {
    console.log('ITEM', item);
    let template;
    switch (item.type) {
      case 1:
        template = (
          <OneColumsAnswers
            answers={item.answers}
            tries={tries}
            questionText={item.questionText}
            questionsLenght={questionLenght}
            curentLenght={curentLenght}
          />
        );
        break;
      case 2:
        template = (
          <TwoColumsAnswers
            answers={item.answers}
            tries={tries}
            questionText={item.questionText}
            questionsLenght={questionLenght}
            curentLenght={curentLenght}
          />);
        break;
      case 3:
        template = (<YesNoAnswers
          answers={item.answers}
          tries={tries}
          questionText={item.questionText}
          questionsLenght={questionLenght}
          curentLenght={curentLenght}
        />);
        break;
      default: {
        template = null;
      }
    }
    return template;
  }

  render() {
    const item = this.props.listQuestion.questions[this.state.index];
    const itemLenght = this.props.listQuestion.questions.length;
    const { tries } = this.props.listQuestion;
    console.log('tries', tries);
    return (
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
                <span>{tries}</span>tries left
              </h4>
            </div>
          </div>
        </div>
        <div className={styles.taskContainer}>
          {this.renderQuestion(item, tries, itemLenght, this.state.index + 1)}
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
          {this.state.isOpen ?
            <Modal
              show={this.state.isOpen}
              type={this.state.modalType}
            /> : null}
        </div>
      </div>
    );
  }
}
export default ListQuestions;
