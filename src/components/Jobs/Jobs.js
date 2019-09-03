import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userProps } from '@expandorg/app-auth';
import { userSelector } from '@expandorg/app-auth/selectors';
import { historyProps } from '@expandorg/app-utils';

import Page from '../shared/Page';

import Job from './list/Job';
import AssignedJobRedirect from '../shared/AssignedJobRedirect';

import { authenticated } from '../shared/auth';

import { assignJob, fetchJobs } from '../../sagas/jobsSagas';
import { jobsSelector } from '../../selectors/jobsSelectors';
import { assignmentsSelector } from '../../selectors/assignmentsSelectors';

import { assignmentProps, jobProps } from '../shared/propTypes';

import styles from './Jobs.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  jobs: jobsSelector(state),
  assignments: assignmentsSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ assignJob, fetchJobs }, dispatch);

class Jobs extends Component {
  static propTypes = {
    user: userProps.isRequired,
    history: historyProps.isRequired,
    jobs: PropTypes.arrayOf(jobProps),
    assignments: PropTypes.arrayOf(assignmentProps),

    assignJob: PropTypes.func.isRequired,
    fetchJobs: PropTypes.func.isRequired,
  };

  static defaultProps = {
    jobs: [],
    assignments: [],
  };

  componentDidMount() {
    this.props.fetchJobs();
  }

  handleAssign = job => {
    const { history } = this.props;
    if (job.onboarding.enabled) {
      history.push(`/onboarding/${job.id}`);
    } else {
      this.props.assignJob(job.id);
    }
  };

  render() {
    const { jobs, user, assignments } = this.props;

    return (
      <Page title="Browse Jobs">
        <div className={styles.list}>
          {jobs.map(job => (
            <Job
              key={job.id}
              job={job}
              user={user}
              assignment={assignments.find(a => a.jobId === job.id)}
              onAssign={this.handleAssign}
            />
          ))}
        </div>
        <AssignedJobRedirect />
      </Page>
    );
  }
}

export default authenticated(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Jobs)
);
