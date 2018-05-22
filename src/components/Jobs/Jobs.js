import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Content from '../shared/Content';
import EmailSubmission from '../shared/EmailSubmission/EmailSubmission';

import Job from './Job/Job';
import ConfirmModal from './ConfirmModal';
import Disabled from './Disabled';
import DepositPrompt from './DepositPrompt';

import { workerProps, historyProps, jobProps } from '../shared/propTypes';
import { authenticated } from '../hoc/authRules';

import { fetchJobs } from '../../sagas/jobsSagas';
import { setIsJoined } from '../../sagas/tasksSagas';

import { userSelector, isFundedSelector } from '../../selectors/userSelectors';
import { jobsSelector } from '../../selectors/jobsSelectors';

import { JOB_DISABLED } from '../../model/consts';


const mapStateToProps = state => ({
  worker: userSelector(state),
  isFunded: isFundedSelector(state),
  jobs: jobsSelector(state),
});

const mapDispatchToProps = {
  setIsJoined, fetchJobs,
};


class Jobs extends Component {
  static propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.shape(jobProps)),
    worker: PropTypes.shape(workerProps),
    isFunded: PropTypes.bool.isRequired,
    history: PropTypes.shape(historyProps).isRequired,
    setIsJoined: PropTypes.func.isRequired,
    fetchJobs: PropTypes.func.isRequired,
  }

  static defaultProps = {
    jobs: [],
    worker: null,
  }

  state = {
    selected: null,
  }

  componentDidMount() {
    this.props.fetchJobs();
  }

  handleSelect = (job) => {
    this.setState({ selected: job });
  }
  handleCancel = () => {
    this.setState({ selected: null });
  }

  handleConfirm = () => {
    this.props.setIsJoined(true);
    this.props.history.replace('/task');
  }

  render() {
    const { isFunded, worker, jobs } = this.props;
    const { selected } = this.state;

    if (JOB_DISABLED) {
      return <Disabled />;
    }
    const confirmedEmail = (worker.email && worker.confirmed) || process.env.NODE_ENV !== 'production';
    return (
      <Content title="Browse Jobs">
        {jobs.map(job => (
          <Job
            key={job.id}
            job={job}
            isFunded={isFunded}
            onJoin={this.handleSelect}
          />
        ))}
        <DepositPrompt visible={!isFunded} />
        {selected &&
          <ConfirmModal
            job={selected}
            onClose={this.handleCancel}
            onConfirm={this.handleConfirm}
          />
        }
        {!confirmedEmail &&
          <EmailSubmission worker={worker} />
        }
      </Content>
    );
  }
}

export default authenticated(connect(mapStateToProps, mapDispatchToProps)(Jobs));
