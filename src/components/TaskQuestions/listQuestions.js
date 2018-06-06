import React from 'react';
import PropTypes from 'prop-types';
import TwoColumsAnswers from './answers/twoColumAnswer';
import OneColumsAnswers from './answers/oneColumAnswer';
import styles from './Question.module.styl';
// import YesNoAnswers from './answers/yesNoAnswer';

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
    };
    console.log('PROPS in LIst questions', props);
    this.goToNext = this.goToNext.bind(this);
  }
  goToNext = () => {
    this.setState({ index: this.state.index + 1 });
  };

  renderQuestion(item) {
    console.log('ITEM', item);
    let template;
    switch (item.type) {
      case 1:
        template = (<OneColumsAnswers questions={item.answers} />);
        break;
      case 2:
        template = (<TwoColumsAnswers questions={item.answers} />);
        break;
      case 3:
        template = (<TwoColumsAnswers questions={item.answers} />);
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
    console.log('itemLenght', itemLenght);
    return (
      <div>
        <div className={styles.taskHeader}>
          <div className={styles.col1}>
            <h4>
              <span>{this.state.index + 1} / {itemLenght}</span> questions
            </h4>
          </div>
          <div className={styles.col2}>
            <h4>
              <span>{tries}</span>tries left
            </h4>
          </div>
        </div>
        <div className={styles.taskContainer}>
          <p className={styles.phDarkGrey}>{item.question}</p>
          {this.renderQuestion(item)}
          <div className="btn-box">
            <button className={styles.btnAqua} onClick={this.goToNext}>
              <span />
              <span>Next</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ListQuestions;
