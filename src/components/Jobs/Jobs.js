import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userProps, jobProps, assignmentsProps } from '../shared/propTypes';

import Content from '../shared/Content';
import ConfirmEmailDialog from '../shared/email/ConfirmEmailDialog';

import Job from './Job/Job';
import AssignDialog from './AssignDialog';
import Disabled from './Disabled';
import DepositPrompt from './DepositPrompt';

import { authenticated } from '../hoc/authRules';

import { fetchJobs } from '../../sagas/jobsSagas';

import { userSelector, isFundedSelector } from '../../selectors/userSelectors';
import { jobsSelector } from '../../selectors/jobsSelectors';
import { assignmentsSelector } from '../../selectors/assignmentsSelectors';

import { JOB_DISABLED } from '../../model/consts';

import styles from './Jobs.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  isFunded: isFundedSelector(state),
  jobs: jobsSelector(state),
  assignments: assignmentsSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchJobs }, dispatch);

class Jobs extends Component {
  static propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.shape(jobProps)),
    user: PropTypes.shape(userProps).isRequired,
    isFunded: PropTypes.bool.isRequired,
    assignments: PropTypes.arrayOf(PropTypes.shape(assignmentsProps)).isRequired,
    fetchJobs: PropTypes.func.isRequired,
  }

  static defaultProps = {
    jobs: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: null,
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
      this.setState({ selected: job });
    }
  }

  handleCancel = () => {
    this.setState({ selected: null });
  }

  render() {
    const {
      isFunded, user, jobs, assignments,
    } = this.props;
    const { selected, emailDialog } = this.state;

    if (JOB_DISABLED) {
      return <Disabled />;
    }

    return (
      <Content title="Browse Jobs">
        <div className={styles.list}>
          {jobs.map(job => (
            <Job
              key={job.id}
              job={job}
              assignment={assignments.find(a => a.jobId === job.id)}
              isFunded={isFunded}
              onJoin={this.handleSelect}
            />
          ))}
        </div>
        {selected &&
          <AssignDialog job={selected} onHide={this.handleCancel} onAssign={this.handleAssign} />
        }
        {emailDialog &&
          <ConfirmEmailDialog user={user} onHide={() => this.setState({ emailDialog: false })} />
        }
        <DepositPrompt visible={!isFunded} />
      </Content>
    );
  }
}

export default authenticated(connect(mapStateToProps, mapDispatchToProps)(Jobs));
