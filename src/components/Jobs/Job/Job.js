import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authenticated } from '../../hoc/authRules';

import { getJob, assignJob } from '../../../sagas/jobsSagas';

import { requestStateProps, jobProps, historyProps } from '../../shared/propTypes';
import { jobIdSelector } from '../../../selectors/jobsSelectors';

import { RequestStates } from '../../../common/app/requestUiState';

import {
  answersStateSelector,
  startTestStateSelector,
  postAnswerStateSelector,
  assignJobStateSelector,
} from '../../../selectors/uiStateSelectors';
import { fetchAnswer, startTest, cancelTest, postAnswer } from '../../../sagas/answersSagas';

import styles from './styles/Base.module.styl';

import Task from './Description';
import Rules from './Rules';
import Eligibility from './Eligibility';
import Questions from './Questions';

const makeMapStateToProps = (state, props) => ({
  jobId: props.match.params.jobId,
  job: jobIdSelector(state, props.match.params.jobId),
  assignState: assignJobStateSelector(state),
  answerState: answersStateSelector(state),
  startState: startTestStateSelector(state),
  postState: postAnswerStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getJob, fetchAnswer, startTest, cancelTest, postAnswer, assignJob,
  }, dispatch);

class Base extends Component {
  static propTypes = {
    jobId: PropTypes.string.isRequired,
    job: PropTypes.shape(jobProps),
    history: PropTypes.shape(historyProps).isRequired,
    getJob: PropTypes.func.isRequired,
    answerState: PropTypes.shape(requestStateProps).isRequired,
    startState: PropTypes.shape(requestStateProps).isRequired,
    postState: PropTypes.shape(requestStateProps).isRequired,
    fetchAnswer: PropTypes.func.isRequired,
    startTest: PropTypes.func.isRequired,
    cancelTest: PropTypes.func.isRequired,
    postAnswer: PropTypes.func.isRequired,
    assignState: PropTypes.shape(requestStateProps).isRequired,
    assignJob: PropTypes.func.isRequired,
  };

  static defaultProps = {
    job: null,
  };

  state = {
    step: 0,
  }

  componentDidMount() {
    this.props.getJob(this.props.jobId);
    this.props.fetchAnswer(this.props.jobId);
  }

  componentWillReceiveProps({
    answerState: nextAnswerState,
    startState: nextStartState,
    postState: nextPostState,
    assignState: nextAssignState,
  }) {
    const {
      assignState,
      answerState,
      startState,
      postState,
    } = this.props;
    if (answerState.state === RequestStates.Fetching
      && nextAnswerState.state === RequestStates.Fetched) {
      this.processData(nextAnswerState.payload, this.state.step);
    }
    if (startState.state === RequestStates.Fetching
      && nextStartState.state === RequestStates.Fetched) {
      this.processData(nextStartState.payload, 3);
    }
    if (postState.state === RequestStates.Fetching
      && nextPostState.state === RequestStates.Fetched) {
      this.processData(nextPostState.payload, 3);
    }
    if (assignState.state === RequestStates.Fetching
      && nextAssignState.state === RequestStates.Fetched) {
      this.props.history.push(`/tasks/${nextAssignState.payload.result.assignedTasks}`);
    }
  }

  processData = (data, step) => {
    const { questions, answers } = data.entities;
    const { result } = data;
    if (result.questions) {
      const question = questions[result.questions];
      if (typeof question.data === 'string') {
        question.data = JSON.parse(question.data);
      }
      this.setState({ question });
    } else {
      this.finishedTest();
    }
    if (result.answers) {
      const answer = answers[result.answers];
      if (typeof answer.answers === 'string') {
        answer.answers = JSON.parse(answer.answers);
      }
      this.setState({ answer, step: step || 3 });
    }
  }

  nextStep = () => {
    if (this.state.step === 1 && !this.state.question) {
      // if there is not question and we are on first step we are automatically assigning the job
      this.finishedTest();
    } else {
      this.setState({ step: this.state.step + 1 });
    }
  }

  startTesting = () => {
    if (this.state.answer) {
      this.setState({ step: 3 });
    } else {
      this.props.startTest(this.props.jobId);
    }
  }

  postAnswer = (answer, index) => {
    const { jobId } = this.props;
    this.props.postAnswer({ jobId, index, answer });
  }

  cancelTest = (index) => {
    const { jobId } = this.props;
    this.props.cancelTest({ jobId, index });
    this.props.history.push('/jobs');
  }

  finishedTest = () => {
    const { assignState, jobId } = this.props;
    if (assignState.state !== RequestStates.Fetching) {
      this.props.assignJob(jobId);
    }
  }

  abandon = () => {
    this.props.history.push('/jobs');
  }

  render() {
    const { job } = this.props;
    return (
      <div className={styles.questionPage}>
        <div className={styles.taskTitle}>
          <h2>{ job ? job.name : '' }</h2>
        </div>
        <div className={styles.questionWraper}>
          {this.state.step === 0 ? <Task job={job} next={this.nextStep} /> : null}
          {this.state.step === 1 ? <Rules next={this.nextStep} /> : null}
          {this.state.step === 2 ? <Eligibility next={this.startTesting} /> : null}
          {this.state.step === 3 ?
            <Questions
              job={job}
              next={this.nextStep}
              question={this.state.question}
              answer={this.state.answer}
              postAnswer={this.postAnswer}
              cancelTest={this.cancelTest}
              finishedTest={this.finishedTest}
              abandon={this.abandon}
            /> : null}
        </div>
      </div>
    );
  }
}
export default authenticated(connect(makeMapStateToProps, mapDispatchToProps)(Base));
