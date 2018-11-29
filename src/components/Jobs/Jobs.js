import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userSelector } from '@gemsorg/app-auth/selectors';

import {
  userProps,
  jobProps,
  assignmentProps,
  historyProps,
} from '../shared/propTypes';

import Content from '../shared/Content';
import ConfirmEmailDialog from '../shared/email/ConfirmEmailDialog';
import AssignedJobRedirect from '../shared/AssignedJobRedirect';

import JobItem from './JobItem';

import { authenticated } from '../hoc/authRules';

import { assignJob } from '../../sagas/jobsSagas';

import { jobsSelector } from '../../selectors/jobsSelectors';
import { assignmentsSelector } from '../../selectors/assignmentsSelectors';

import styles from './Jobs.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  jobs: jobsSelector(state),
  assignments: assignmentsSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ assignJob }, dispatch);

class Jobs extends Component {
  static propTypes = {
    jobs: PropTypes.arrayOf(jobProps),
    user: userProps.isRequired,
    history: historyProps.isRequired,
    assignments: PropTypes.arrayOf(assignmentProps).isRequired,
    assignJob: PropTypes.func.isRequired,
  };

  static defaultProps = {
    jobs: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      emailDialog: false,
    };
  }

  handleSelect = job => {
    const { user, history } = this.props;
    if (!user.emailConfirmed) {
      this.setState({ emailDialog: true });
    } else if (job.onboarding.enabled) {
      history.push(`/jobs/${job.id}`);
    } else {
      this.props.assignJob(job.id);
    }
  };

  render() {
    const { user, jobs, assignments } = this.props;

    const { emailDialog } = this.state;
    return (
      <Content title="Browse Jobs">
        <div className={styles.list}>
          {jobs.map(job => (
            <JobItem
              key={job.id}
              job={job}
              user={user}
              assignment={assignments.find(a => a.jobId === job.id)}
              onJoin={this.handleSelect}
            />
          ))}
        </div>
        {emailDialog && (
          <ConfirmEmailDialog
            user={user}
            onHide={() => this.setState({ emailDialog: false })}
          />
        )}
        <AssignedJobRedirect />
      </Content>
    );
  }
}

export default authenticated(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Jobs)
);
