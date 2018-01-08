import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { css } from 'glamor';
import Modal from './Modal';
import { job as jobPropTypes, task as taskPropTypes, stats as statsProps } from '../schemas';
import { FLEX_PANEL, BORDER_R, PADDING } from '../style-constants';

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
    display: 'inline-block',
    fontSize: '18px',
    letterSpacing: '-0.7px',
    textAlign: 'center',
    color: '#ffffff',
    marginLeft: '8px',
    border: '0',
    cursor: 'pointer',
    ':focus': {
      outline: '0',
    },
    ':hover': {
      backgroundImage: 'linear-gradient(to bottom right,#ff7092,#FF8EA9)',
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
    width: '40%',
    display: 'inline-block',
    border: 'solid 1px #f2f2f2',
    borderRadius: '4px',
    fontSize: '40px',
    color: '#ff7092',
    textAlign: 'center',
    paddingTop: '46px',
    paddingBottom: '46px',
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

    const complete = this.props.stats ? this.props.stats.complete : 0;
    const incomplete = this.props.stats ? this.props.stats.incomplete : 0;

    this.state = {
      value: null,
      complete,
      incomplete,
    };
  }

  componentWillMount() {
    if (this.props.task === null) {
      this.props.replace('/jobs');
      return;
    }
    this.props.setTitle('Complete Math Problem');
    this.props.fetchAuth();
  }

  toggleModal() {
    this.props.setPreviousJobId(null);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitTask(this.state.value);
    this.setState({
      value: null,
      incomplete: this.state.incomplete + 1,
    });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleAssign(e) {
    e.preventDefault();
    this.props.assignTask(this.props.previousJobId);
  }

  hasNextTask() {
    const { previousJobId } = this.props;
    if (previousJobId === null) {
      return false;
    }
    const previousJob = this.props.jobs[previousJobId];
    if (previousJob === undefined) {
      return false;
    }
    return this.props.jobs[previousJobId].availableTasks > 0;
  }

  render() {
    // Task has just been submitted
    if (this.props.task === null) {
      return (
        <Modal
          heading={<span>Task Submitted</span>}
          toggleModal={this.toggleModal}
        >
          {this.props.task !== null && <div>Submitting task...</div>}
          {this.props.task === null && (
            <div>
              <div className={styles.heading}>Submission successful!</div>
              {
                this.hasNextTask() &&
                <button className={styles.btn} onClick={this.handleAssign}>
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
        <div className={styles.task}>{this.props.task.description}</div>
        <form onSubmit={this.handleSubmit} className={styles.submitForm}>
          <label htmlFor="answer">
            <input
              className={styles.input}
              onChange={this.handleChange}
              id="answer"
              value={this.state.value || ''}
              placeholder="Answer"
            />
          </label>
          <button
            className={styles.submit}
            onClick={this.handleSubmit}
            disabled={this.state.value === null}
          >
            Submit
          </button>
        </form>
        <div className={styles.completed}>
          {this.state.complete ? this.state.complete : 0}
          <span>Tasks Verified</span>
        </div>
        <div className={styles.completed}>
          {this.state.incomplete ? this.state.incomplete : 0}
          <span>Tasks Pending*</span>
        </div>
        <span>*Tasks are pending result verification</span>
      </div>
    );
  }
}

Task.defaultProps = {
  previousJobId: null,
  task: null,
  stats: { complete: 0, incomplete: 0 },
};

Task.propTypes = {
  assignTask: PropTypes.func.isRequired,
  jobs: PropTypes.objectOf(PropTypes.shape(jobPropTypes)).isRequired,
  previousJobId: PropTypes.string,
  replace: PropTypes.func.isRequired,
  setPreviousJobId: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  submitTask: PropTypes.func.isRequired,
  task: PropTypes.shape(taskPropTypes),
  fetchAuth: PropTypes.func.isRequired,
  stats: PropTypes.shape(statsProps),
};

export default Task;
