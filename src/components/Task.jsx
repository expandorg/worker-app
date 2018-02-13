import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { css } from 'glamor';
import Modal from './Modal';
import { stats as statsProps } from '../schemas';
import { FLEX_PANEL, BORDER_R, PADDING } from '../style-constants';

const TITLE = 'Question writing and fact checking';
const DESCRIPTION = 'Write a trivia question with three multiple-choice answers. One answer should be correct and fact-checked, and two answers should be incorrect.';

const styles = {
  container: FLEX_PANEL,
  task: css({
    fontSize: '32px',
    textAlign: 'center',
    color: '#3a506b',
    margin: PADDING,
    display: 'block',
  }),
  submitForm: css({
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    marginBottom: PADDING,
    width: '80%',
  }),
  submit: css({
    width: '119px',
    height: '50px',
    borderRadius: BORDER_R,
    backgroundColor: '#ff7092',
    display: 'block',
    fontSize: '18px',
    letterSpacing: '-0.7px',
    textAlign: 'center',
    color: '#ffffff',
    margin: '0 auto',
    border: '0',
    cursor: 'pointer',
    ':focus': {
      outline: '0',
    },
    ':hover': {
      backgroundImage: 'linear-gradient(to bottom right,#ff7092,#FF8EA9)',
    },
    ':disabled': {
      backgroundColor: '#f2f2f2',
      ':hover': {
        backgroundImage: 'none',
      },
    },
  }),
  heading: css({
    fontSize: '20px',
    letterSpacing: '-0.3px',
    textAlign: 'center',
    color: '#3a506b',
    display: 'block',
    marginBottom: PADDING / 2,
  }),
  input: css({
    width: 'calc(100% - 200px)',
    minWidth: '200px',
    height: '50px',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    border: 'solid 1px #e0e0e0',
    display: 'inline-block',
    fontSize: '16px',
    textAlign: 'left',
    paddingLeft: '15px',
    marginBottom: '15px',
    color: '#b8b8b8',
    '::placeholder': {
      fontSize: '16px',
      textAlign: 'left',
      color: '#b8b8b8',
    },
    ':focus': {
      outline: '0',
    },
  }),
  btn: css({
    width: 205,
    height: 50,
    lineHeight: '50px',
    borderRadius: BORDER_R,
    backgroundColor: '#6fffe9',
    display: 'block',
    margin: 'auto',
    marginBottom: PADDING,
    fontSize: '18px',
    letterSpacing: '-0.7px',
    textAlign: 'center',
    border: 0,
    cursor: 'pointer',
    textDecoration: 'none',
    ':focus': {
      outline: 0,
    },
    ':hover': {
      backgroundImage: 'linear-gradient(to bottom right,#6fffe9,#94FFEF)',
    },
  }),
  completed: css({
    width: '30%',
    display: 'inline-block',
    border: 'solid 1px #f2f2f2',
    borderRadius: '4px',
    fontSize: '40px',
    color: '#ff7092',
    textAlign: 'center',
    paddingTop: '46px',
    paddingBottom: '46px',
    marginBottom: '25px',
    '> span': {
      fontSize: '16px',
      color: '#3a506b',
      display: 'block',
    },
  }),
};

class Task extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      loading: false,
      question: null,
      correctAnswer: null,
      incorrectAnswerA: null,
      incorrectAnswerB: null,
      submitted: false,
    };
  }

  componentWillMount() {
    this.props.setTitle(TITLE);
    this.props.fetchAuth();
  }

  getHandleChange(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
    };
  }

  getSubmissionStatus() {
    return this.props.error || 'Submission successful!';
  }

  handleSubmit(e) {
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
      incomplete: this.state.incomplete + 1,
      submitted: true,
    });
  }

  renderSubmit() {
    if (this.state.loading && !this.props.error) {
      return 'Loading';
    }
    return 'Submit';
  }

  render() {
    // Task has just been submitted
    if (this.state.submitted) {
      return (
        <Modal
          heading={<span>Task Submitted</span>}
          toggleModal={this.toggleModal}
        >
          {this.props.isSubmitting && <div>Submitting task...</div>}
          {this.props.isSubmitting || (
            <div>
              <div className={styles.heading}>{this.getSubmissionStatus()}</div>
              {this.props.error === null &&
                <button
                  className={styles.btn}
                  onClick={() => this.setState({ submitted: false })}
                  disabled={this.state.gettingTask}
                >
                  Next task
                </button>
              }
              <div className={styles.heading}>
                <Link to="/jobs">Browse available jobs</Link>
              </div>
            </div>
          )}
        </Modal>
      );
    }

    // Completing task
    return (
      <div className={styles.container}>
        <div className={styles.task}>{DESCRIPTION}</div>
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
            {this.renderSubmit()}
          </button>
        </form>
        <div className={styles.completed}>
          {this.props.stats.pending || 0}
          <span>Tasks Pending*</span>
        </div>
        <div className={styles.completed}>
          {this.props.stats.accepted || 0}
          <span>Tasks Accepted</span>
        </div>
        <div className={styles.completed}>
          {this.props.stats.rejected || 0}
          <span>Tasks Rejected</span>
        </div>
        <span>*Tasks are pending acceptance</span>
      </div>
    );
  }
}

Task.defaultProps = {
  error: null,
};

Task.propTypes = {
  setTitle: PropTypes.func.isRequired,
  submitTask: PropTypes.func.isRequired,
  fetchAuth: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  stats: PropTypes.shape(statsProps).isRequired,
  error: PropTypes.string,
};

export default Task;
