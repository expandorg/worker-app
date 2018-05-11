import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Content from '../shared/Content';
import EmailSubmission from '../shared/EmailSubmission/EmailSubmission';

import Job from './Job/Job';
import ConfirmModal from './ConfirmModal';
import Disabled from './Disabled';
import DepositPrompt from './DepositPrompt';

import { workerProps, statsProps, routerProps } from '../shared/propTypes';
import { JOB_DISABLED } from '../../model/consts';
import { isWorkerFunded } from '../../model/worker';

const jobs = [{
  id: 0,
  title: 'Trivia Question and Answer Creation',
  requester: 'Stream Live Inc',
  imageUrl: '/images/trivia-screen.png',
  description: 'Write a trivia question with three multiple-choice answers. One answer should be correct and fact-checked, and two answers should be incorrect.',
}];


export default class Jobs extends Component {
  static propTypes = {
    router: PropTypes.shape(routerProps).isRequired,
    setIsJoined: PropTypes.func.isRequired,
    worker: PropTypes.shape(workerProps),
    stats: PropTypes.shape(statsProps).isRequired,
  }

  static defaultProps = {
    worker: null,
  }

  state ={
    selected: null,
  }

  handleSelect = (job) => {
    this.setState({ selected: job });
  }
  handleCancel = () => {
    this.setState({ selected: null });
  }

  handleConfirm = () => {
    this.props.setIsJoined(true);
    this.props.router.replace('/task');
  }

  render() {
    const { stats, worker } = this.props;
    const { selected } = this.state;

    if (JOB_DISABLED) {
      return <Disabled />;
    }
    const confirmedEmail = (worker.email && worker.confirmed) || process.env.NODE_ENV !== 'production';
    const isFunded = isWorkerFunded(worker, stats);
    return (
      <Content title="Browse Jobs">
        {!confirmedEmail &&
          <EmailSubmission worker={worker} />
        }
        {jobs.map(job => (
          <Job
            key={job.id}
            job={job}
            isFunded={isFunded}
            onJoin={this.handleSelect}
          />
        ))}
        {!isFunded &&
          <DepositPrompt />
        }
        {selected &&
          <ConfirmModal
            job={selected}
            onClose={this.handleCancel}
            onConfirm={this.handleConfirm}
          />
        }
      </Content>
    );
  }
}
