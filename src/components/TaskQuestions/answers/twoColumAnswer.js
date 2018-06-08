import React from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';
import Messages from './messages';
import general from '../styles/General.module.styl';
import styles from './Answers.module.styl';

class TwoColumsAnswers extends React.Component {
  static propTypes = {
    answers: PropTypes.objectOf(PropTypes.string).isRequired,
    tries: PropTypes.number.isRequired,
    questionText: PropTypes.string.isRequired,
    questionsLenght: PropTypes.number.isRequired,
    curentLenght: PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      isOpen: false,
      answerTruthy: null,
      modalType: null,
      message: false,
      messageType: null,
    };
    console.log('Two COLUMN component', props.tries);
  }

  getListQuestions(key, i) {
    const answer = {
      tries: 2,
      truthy: false,
    };
    const checkTruthy = answer.truthy;
    if (answer.tries < 1 && !checkTruthy) {
      this.setState({
        message: true,
        messageType: 1,
      });
    }
    if ((this.props.questionsLenght === this.props.curentLenght) && checkTruthy) {
      this.setState({
        message: true,
        messageType: 2,
      });
    }
    if (!checkTruthy) {
      this.setState({
        isOpen: true,
        modalType: 0,
      });
    }
    this.setState({
      activeIndex: i,
      answerTruthy: answer,
    });
  }
  render() {
    const transActive = general.btnTransActive;
    const trans = general.btnTrans;
    return (
      <div>
        {!this.state.message ?
          <div>
            <p className={styles.phDarkGrey}>{this.props.questionText}</p>
            <div className={styles.twoColumn}>
              {Object.keys(this.props.answers).map((key, i) => {
                const activeLink = this.state.activeIndex === i ? transActive : trans;
                return (
                  <button
                    className={activeLink}
                    key={key}
                    onClick={() => this.getListQuestions(key, i)}
                  >
                    <span>{key}</span>
                    <span>{this.props.answers[key]}</span>
                  </button>);
              })}
            </div>
          </div> : null}
        <Modal
          show={this.state.isOpen}
          type={this.state.modalType}
          answer={this.state.answerTruthy}
        />
        {this.state.message ?
          <Messages messageType={this.state.messageType} /> : null}
      </div>
    );
  }
}
export default TwoColumsAnswers;
