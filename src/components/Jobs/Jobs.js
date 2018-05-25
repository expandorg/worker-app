import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userProps, jobProps } from '../shared/propTypes';

import Content from '../shared/Content';
import EmailSubmission from '../shared/EmailSubmission/EmailSubmission';

import Job from './Job/Job';
import AssignDialog from './AssignDialog';
import Disabled from './Disabled';
import DepositPrompt from './DepositPrompt';

import { authenticated } from '../hoc/authRules';

import { fetchJobs } from '../../sagas/jobsSagas';

import { userSelector, isFundedSelector } from '../../selectors/userSelectors';
import { jobsSelector } from '../../selectors/jobsSelectors';

import { JOB_DISABLED } from '../../model/consts';

import styles from './Jobs.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
  isFunded: isFundedSelector(state),
  jobs: jobsSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchJobs }, dispatch);

class Jobs extends Component {
  static propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.shape(jobProps)),
    user: PropTypes.shape(userProps),
    isFunded: PropTypes.bool.isRequired,
    fetchJobs: PropTypes.func.isRequired,
  }

  static defaultProps = {
    jobs: [],
    user: null,
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

  render() {
    const { isFunded, user, jobs } = this.props;
    const { selected } = this.state;

    if (JOB_DISABLED) {
      return <Disabled />;
    }

    const confirmedEmail = (user.email && user.confirmed) || process.env.NODE_ENV !== 'production';
    return (
      <Content title="Browse Jobs">
        <div className={styles.list}>
          {jobs.map(job => (
            <Job
              key={job.id}
              job={job}
              isFunded //= {isFunded}
              onJoin={this.handleSelect}
            />
          ))}
        </div>
        {selected &&
          <AssignDialog job={selected} onHide={this.handleCancel} onAssign={this.handleAssign} />
        }
        {!confirmedEmail &&
          <EmailSubmission worker={user} />
        }
        <DepositPrompt visible={!isFunded} />
      </Content>
    );
  }
}

export default authenticated(connect(mapStateToProps, mapDispatchToProps)(Jobs));
