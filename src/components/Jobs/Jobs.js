import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Job from './Job';
import EmailSubmission from '../EmailSubmission';

import { worker as workerProps, stats as statsProps, routerProps } from '../shared/propTypes';
import Content from '../shared/Content';

import { isWorkerFunded } from '../../model/worker';

import styles from './Jobs.styles';

const JOB_DISABLED = false;

export default class Jobs extends Component {
  static propTypes = {
    router: PropTypes.shape(routerProps).isRequired,
    setIsJoined: PropTypes.func.isRequired,
    worker: PropTypes.shape(workerProps),
    error: PropTypes.string,
    stats: PropTypes.shape(statsProps).isRequired,
  };

  static defaultProps = {
    error: null,
    worker: null,
  };

  renderEmailModal() {
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }
    if (!this.props.worker.email || !this.props.worker.confirmed) {
      return (
        <EmailSubmission worker={this.props.worker} />
      );
    }
    return false;
  }

  renderDepositPrompt() {
    if (isWorkerFunded(this.props.worker, this.props.stats)) {
      return false;
    }
    return (
      <div className={styles.disclaimer}>
        <p>
          *Before you can complete tasks to earn Gems,
          you will first have to deposit a small amount through the account page.<br />
          These Gems will not be lost, even if your task submissions are not accepted.
        </p>
        <p>
          For each task you submit, you must reserve 0.1 GEM tokens.<br />
          Once your tasks are either accepted or rejected,
          that reserve will be released so that you may complete more tasks.
        </p>
      </div>
    );
  }


  render() {
    if (JOB_DISABLED) {
      return (
        <Content title="Browse Jobs">
          <div className={styles.innerContainer}>
            There are currently no available jobs. Please check back soon!
          </div>
        </Content>
      );
    }
    return (
      <Content title="Browse Jobs">
        {this.renderEmailModal()}
        <Job
          replace={this.props.router.replace}
          setIsJoined={this.props.setIsJoined}
          error={this.props.error}
          worker={this.props.worker}
          stats={this.props.stats}
        />
        {this.renderDepositPrompt()}
      </Content>
    );
  }
}
