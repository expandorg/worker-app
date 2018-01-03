import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { css } from 'glamor';
import Modal from './Modal';
import { job as jobPropTypes, task as taskPropTypes } from '../schemas';
import { PANEL, BORDER_R, PADDING } from '../style-constants';

const styles = {
  container: PANEL,
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
};

const TRUE = 'true';
const FALSE = 'false';

class Task extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      value: null,
    };
  }

  componentWillMount() {
    if (this.props.task === null) {
      this.props.replace('/jobs');
      return;
    }
    this.props.setTitle('Task');
  }

  getClickHandler(value) {
    return () => this.setState({ value });
  }

  toggleModal() {
    this.props.setPreviousJobId(null);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submitTask(this.state.value);
    this.setState({ value: null });
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
          heading={<span>Submitting task</span>}
          toggleModal={this.toggleModal}
        >
          {this.props.task !== null && <div>Submitting task...</div>}
          {this.props.task === null && (
            <div>
              <div>Submission successful.</div>
              {
                this.hasNextTask() &&
                <div><button onClick={this.handleAssign}>Next task</button></div>
              }
              <div><Link to="/jobs">Browse available jobs</Link></div>
            </div>
          )}
        </Modal>
      );
    }

    // Completing task
    return (
      <div>
        <div className={styles.task}>{this.props.task.description}</div>
        <form onSubmit={this.handleSubmit} className={styles.submitForm}>
          <label htmlFor="true-value">
            <input
              type="radio"
              id="true-value"
              value="true"
              checked={this.state.value === TRUE}
              onChange={this.getClickHandler(TRUE)}
            />
            Valid edit
          </label>
          <label htmlFor="false-value">
            <input
              type="radio"
              id="false-value"
              value="false"
              checked={this.state.value === FALSE}
              onChange={this.getClickHandler(FALSE)}
            />
            Invalid edit
          </label>
          <button
            className={styles.submit}
            onClick={this.handleSubmit}
            disabled={this.state.value === null}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

Task.defaultProps = {
  previousJobId: null,
  task: null,
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
};

export default Task;
