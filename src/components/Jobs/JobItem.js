import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { userBalance } from '@expandorg/app-gemtokens';
import { userProps } from '@expandorg/app-auth';
import { jobProps, assignmentProps } from '../shared/propTypes';

import styles from './JobItem.module.styl';

const isSufficientFunds = (user, job) => {
  if (job.logic.funding.module === 'requirement') {
    const available = userBalance.availableBalance(user);
    return userBalance.isGreaterThanOrEqualTo(
      available,
      job.logic.funding.requirement
    );
  }
  return true;
};

export default class JobItem extends Component {
  static propTypes = {
    job: jobProps.isRequired,
    user: userProps.isRequired,
    assignment: assignmentProps,
    onJoin: PropTypes.func.isRequired,
  };

  static defaultProps = {
    assignment: null,
  };

  handleJoin = () => {
    const { onJoin, job } = this.props;
    onJoin(job);
  };

  render() {
    const { job, user, assignment } = this.props;
    const isJoined = !!assignment;
    const isFunded = isSufficientFunds(user, job);

    return (
      <div className={styles.container}>
        <img className={styles.logo} src={job.logo} alt={job.requester} />
        <div className={styles.info}>
          <div className={styles.heading}>{job.name}</div>
          <div className={styles.requester}>{job.requester}</div>
          <div>
            {isFunded && !isJoined && (
              <button onClick={this.handleJoin} className={styles.join}>
                Join
              </button>
            )}
            {isJoined && (
              <Link className={styles.link} to={`/tasks/${assignment.taskId}`}>
                You have already joined this task
              </Link>
            )}
            {!isJoined && !isFunded && (
              <div>Please deposit Gems to participate*</div>
            )}
            <div className={styles.rewardMobile}>
              <span className={styles.rewardNumber}>
                {job.logic.funding.reward}
              </span>
              <img
                className={styles.rewardIcon}
                src="/images/logo_icon.svg"
                alt="Gems"
              />
            </div>
          </div>
        </div>
        <div className={styles.reward}>
          <span className={styles.rewardNumber}>
            {job.logic.funding.reward}
          </span>
          <img
            className={styles.rewardIcon}
            src="/images/logo_icon.svg"
            alt="Gems"
          />
        </div>
      </div>
    );
  }
}
