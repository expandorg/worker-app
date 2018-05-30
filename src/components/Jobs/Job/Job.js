import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { jobProps } from '../../shared/propTypes';

import styles from './Job.module.styl';

export default class Job extends Component {
  static propTypes = {
    job: PropTypes.shape(jobProps).isRequired,
    isFunded: PropTypes.bool.isRequired,
    onJoin: PropTypes.func.isRequired,
  };

  handleJoin = () => {
    const { onJoin, job } = this.props;
    onJoin(job);
  }

  render() {
    const { isFunded, job } = this.props;
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
            {isFunded
              ? <button onClick={this.handleJoin} className={styles.join}>Join</button>
              : <div>Please deposit Gems to participate*</div>
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
