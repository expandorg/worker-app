import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from '../common/Modal';

import Content from '../shared/Content';

import styles from './Task.module.styl';

export default class Task extends Component {
  static propTypes = {
    submitTask: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isFunded: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: null,
  };

  state = {
    loading: false,
    question: null,
    correctAnswer: null,
    incorrectAnswerA: null,
    incorrectAnswerB: null,
    submitted: false,
  }

  getHandleChange = key => (e) => {
    this.setState({ [key]: e.target.value });
  }

  getSubmissionStatus() {
    return this.props.error || 'Submission successful!';
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submitTask({
      question: this.state.question,
      correctAnswer: this.state.correctAnswer,
      incorrectAnswerA: this.state.incorrectAnswerA,
      incorrectAnswerB: this.state.incorrectAnswerB,
    });
    this.setState({
      question: null,
      correctAnswer: null,
      incorrectAnswerA: null,
      incorrectAnswerB: null,
      submitted: true,
    });
  }

  render() {
    const { isFunded, error, isSubmitting } = this.props;
    const { loading } = this.state;

    if (this.state.submitted) {
      return (
        <Modal heading="Task Submitted">
          {isSubmitting &&
            <div>Submitting task...</div>
          }
          {!isSubmitting && (
            <div>
              <div className={styles.heading}>{this.getSubmissionStatus()}</div>
              {isFunded && (
                this.props.error === null &&
                  <button
                    className={styles.btn}
                    onClick={() => this.setState({ submitted: false })}
                    disabled={this.state.gettingTask}
                  >
                    Next task
                  </button>
              )}
              {isFunded ||
                <div>
                  Your Gems balance is not high enough to submit more tasks.<br />
                  Please deposit more Gems to submit again.
                </div>
              }
              <div className={styles.heading}>
                <Link to="/jobs">Browse available jobs</Link>
              </div>
            </div>
          )}
        </Modal>
      );
    }

    return (
      <Content title="Question writing and fact checking">
        <div className={styles.container}>
          <div className={styles.task}>
            Write a trivia question with three multiple-choice answers.
            One answer should be correct and fact-checked, and two answers should be incorrect.
          </div>
          <form onSubmit={this.handleSubmit} className={styles.submitForm}>
            <label htmlFor="question">
              <input
                className={styles.input}
                onChange={this.getHandleChange('question')}
                id="question"
                value={this.state.question || ''}
                placeholder="Question"
              />
            </label>
            <label htmlFor="correctAnswer">
              <input
                className={styles.input}
                onChange={this.getHandleChange('correctAnswer')}
                id="correctAnswer"
                value={this.state.correctAnswer || ''}
                placeholder="Correct Answer"
              />
            </label>
            <label htmlFor="incorrectAnswerA">
              <input
                className={styles.input}
                onChange={this.getHandleChange('incorrectAnswerA')}
                id="incorrectAnswerA"
                value={this.state.incorrectAnswerA || ''}
                placeholder="Incorrect Answer"
              />
            </label>
            <label htmlFor="incorrectAnswerB">
              <input
                className={styles.input}
                onChange={this.getHandleChange('incorrectAnswerB')}
                id="incorrectAnswerB"
                value={this.state.incorrectAnswerB || ''}
                placeholder="Incorrect Answer"
              />
            </label>
            <button
              className={styles.submit}
              onClick={this.handleSubmit}
              disabled={this.state.value === null || this.state.value === '' || (this.state.loading && !this.props.error)}
            >
              {loading && !error ? 'Loading' : 'Submit'}
            </button>
          </form>
        </div>
      </Content>
    );
  }
}
