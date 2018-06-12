import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { jobProps, taskProps } from '../../shared/propTypes';

import styles from './Job.module.styl';

export default class Job extends Component {
  static propTypes = {
    job: PropTypes.shape(jobProps).isRequired,
    task: PropTypes.shape(taskProps),
    isFunded: PropTypes.bool.isRequired,
    onJoin: PropTypes.func.isRequired,
  };

  static defaultProps = {
    task: null,
  }

  handleJoin = () => {
    const { onJoin, job } = this.props;
    onJoin(job);
  }

  render() {
    const { isFunded, task, job } = this.props;
    const isJoined = !!task;
    return (
      <div className={styles.container}>
        <img className={styles.logo} src={job.logo} alt={job.requester} />
        <div className={styles.info}>
          <div className={styles.heading}>
            {job.name}
          </div>
          <div className={styles.requester}>
            {job.requester}
          </div>
          <div>
            {}
            {isFunded && !isJoined &&
              <button onClick={this.handleJoin} className={styles.join}>
                Join
              </button>
            }
            {isJoined &&
              <Link className={styles.link} to={`/tasks/${task.id}`}>You have already joined this task</Link>
            }
            {!isJoined && !isFunded &&
              <div>Please deposit Gems to participate*</div>
            }
            <div className={styles.rewardMobile}>
              <span className={styles.rewardNumber}>{job.logic.funding.reward}</span>
              <img className={styles.rewardIcon} src="/images/logo_icon.svg" alt="Gems" />
            </div>
          </div>
        </div>
        <div className={styles.reward}>
          <span className={styles.rewardNumber}>{job.logic.funding.reward}</span>
          <img className={styles.rewardIcon} src="/images/logo_icon.svg" alt="Gems" />
        </div>
      </div>
    );
  }
}
