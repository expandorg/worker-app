import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userProps, jobProps, taskProps, historyProps } from '../shared/propTypes';

import Content from '../shared/Content';
import ConfirmEmailDialog from '../shared/email/ConfirmEmailDialog';

import JobItem from './Job/JobItem';
import Disabled from './Disabled';
import DepositPrompt from './DepositPrompt';

import { authenticated } from '../hoc/authRules';

import { fetchJobs } from '../../sagas/jobsSagas';

import { userSelector, isFundedSelector } from '../../selectors/userSelectors';
import { jobsSelector } from '../../selectors/jobsSelectors';
import { assignedTasksSelector } from '../../selectors/tasksSelector';

import { JOB_DISABLED } from '../../model/consts';

import styles from './Jobs.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  isFunded: isFundedSelector(state),
  jobs: jobsSelector(state),
  assignedTasks: assignedTasksSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchJobs }, dispatch);

class Jobs extends Component {
  static propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.shape(jobProps)),
    user: PropTypes.shape(userProps).isRequired,
    history: PropTypes.shape(historyProps).isRequired,
    isFunded: PropTypes.bool.isRequired,
    assignedTasks: PropTypes.arrayOf(PropTypes.shape(taskProps)).isRequired,
    fetchJobs: PropTypes.func.isRequired,
  }

  static defaultProps = {
    jobs: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      emailDialog: false,
    };
  }

  componentDidMount() {
    this.props.fetchJobs();
  }

  handleSelect = (job) => {
    if (!this.props.user.emailConfirmed) {
      this.setState({ emailDialog: true });
    } else {
      this.props.history.push(`/job/${job.id}`);
    }
  }

  render() {
    const {
      isFunded, user, jobs, assignedTasks,
    } = this.props;
    const { emailDialog } = this.state;

    if (JOB_DISABLED) {
      return <Disabled />;
    }

    return (
      <Content title="Browse Jobs">
        <div className={styles.list}>
          {jobs.map(job => (
            <JobItem
              key={job.id}
              job={job}
              task={assignedTasks.find(t => t.jobId === job.id)}
              isFunded={isFunded}
              onJoin={this.handleSelect}
            />
          ))}
        </div>
        {emailDialog &&
          <ConfirmEmailDialog user={user} onHide={() => this.setState({ emailDialog: false })} />
        }
        <DepositPrompt visible={!isFunded} />
      </Content>
    );
  }
}

export default authenticated(connect(mapStateToProps, mapDispatchToProps)(Jobs));
