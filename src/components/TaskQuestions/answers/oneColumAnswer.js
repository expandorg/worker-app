import React from 'react';
import PropTypes from 'prop-types';
import Modal from './modalWrongAnswer';
import styles from '../Question.module.styl';

class OneColumsAnswers extends React.Component {
  static propTypes = {
    questions: PropTypes.objectOf(PropTypes.string).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      isOpen: false,
      answerTruthy: null,
    };
  }

  getListQuestions(key, i) {
    const answer = {
      tries: 4,
      truthy: false,
    };
    console.log('Answers >>>>', answer);
    const checkTruthy = answer.truthy;
    if (!checkTruthy) {
      this.setState({
        isOpen: true,
      });
    }
    this.setState({
      activeIndex: i,
      answerTruthy: answer,
    });
  }
  render() {
    const transActive = styles.btnTransActive;
    const trans = styles.btnTrans;
    return (
      <div className={styles.oneColumn}>
        {Object.keys(this.props.questions).map((key, i) => {
          const activeLink = this.state.activeIndex === i ? transActive : trans;
          return (
            <button
              className={activeLink}
              key={key}
              onClick={() => this.getListQuestions(key, i)}
            >
              <span>{key}</span>
              <span>{this.props.questions[key]}</span>
            </button>);
        })}
        <Modal
          show={this.state.isOpen}
          onClose={this.closeModal}
          answer={this.state.answerTruthy}
        />
      </div>
    );
  }
}
export default OneColumsAnswers;
