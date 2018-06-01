import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { requestStateProps } from '../shared/propTypes';
import { RequestStates } from '../../common/app/requestUiState';

import styles from './TriviaForm.module.styl';

export default class TriviaForm extends Component {
  static propTypes = {
    submitState: PropTypes.shape(requestStateProps).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    question: '',
    correctAnswer: '',
    incorrectAnswerA: '',
    incorrectAnswerB: '',
  }

  getSubmissionStatus() {
    return 'this.props.error' || 'Submission successful!';
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const {
      question, correctAnswer, incorrectAnswerA, incorrectAnswerB,
    } = this.state;
    const data = {
      question,
      correctAnswer,
      incorrectAnswerA,
      incorrectAnswerB,
    };

    this.props.onSubmit(data);

    this.setState({
      question: null,
      correctAnswer: null,
      incorrectAnswerA: null,
      incorrectAnswerB: null,
    });
  }

  render() {
    const { submitState } = this.props;
    const {
      question, correctAnswer, incorrectAnswerA, incorrectAnswerB,
    } = this.state;

    const isLoading = submitState.state === RequestStates.Fetching;
    const isError = submitState.state === RequestStates.FetchError;

    return (
      <form className={styles.container} onSubmit={this.handleSubmit} >
        <label htmlFor="question">
          <input
            className={styles.input}
            onChange={this.handleChange}
            name="question"
            value={question}
            placeholder="Question"
          />
        </label>
        <label htmlFor="correctAnswer">
          <input
            className={styles.input}
            onChange={this.handleChange}
            name="correctAnswer"
            value={correctAnswer}
            placeholder="Correct Answer"
          />
        </label>
        <label htmlFor="incorrectAnswerA">
          <input
            className={styles.input}
            onChange={this.handleChange}
            name="incorrectAnswerA"
            value={incorrectAnswerA}
            placeholder="Incorrect Answer"
          />
        </label>
        <label htmlFor="incorrectAnswerB">
          <input
            className={styles.input}
            onChange={this.handleChange}
            name="incorrectAnswerB"
            value={incorrectAnswerB}
            placeholder="Incorrect Answer"
          />
        </label>
        <div className={styles.actions}>
          <button
            className={styles.submit}
            onClick={this.handleSubmit}
            disabled={isLoading || isError}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

    );
  }
}
