import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Button } from '@expandorg/components';
import { userProps } from '@expandorg/app-auth';
import { EmailConfirmed } from '@expandorg/app-account/components';

import InsufficientFundsDialog from './InsufficientFundsDialog';

import { ReactComponent as GemsIcon } from '../../assets/gem.svg';

import I from '../../shared/I';
import { jobProps, assignmentProps } from '../../shared/propTypes';
import { jobHasSufficientFunds } from '../../../model/jobs';

import styles from './Job.module.styl';

export default class Job extends Component {
  static propTypes = {
    job: jobProps.isRequired,
    user: userProps.isRequired,
    assignment: assignmentProps,
    onAssign: PropTypes.func.isRequired,
  };

  static defaultProps = {
    assignment: null,
  };

  state = {
    topup: false,
  };

  handleTopupToggle = () => {
    this.setState(({ topup }) => ({ topup: !topup }));
  };

  handleAssign = () => {
    const { onAssign, job, user } = this.props;
    if (jobHasSufficientFunds(job, user)) {
      onAssign(job);
    } else {
      this.handleTopupToggle();
    }
  };

  render() {
    const { job, assignment, user } = this.props;
    const { topup } = this.state;

    const isJoined = !!assignment;

    const sufficientFonds = jobHasSufficientFunds(job, user);

    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <img className={styles.logo} src={job.logo} alt={job.name} />
          <div className={styles.heading}>
            <div className={styles.name}>{job.name}</div>
            <div className={styles.description}>{job.requester}</div>
          </div>
        </div>
        <div className={styles.actions}>
          {!sufficientFonds && (
            <button className={styles.warning} onClick={this.handleTopupToggle}>
              {job.logic.funding.requirement}
              <I
                tooltipOrientation="right"
                className={styles.i}
                tooltip={`You need ${
                  job.logic.funding.requirement
                } to qualify for this job.`}
              />
            </button>
          )}
          <div className={styles.reward}>
            {job.logic.funding.reward}
            <GemsIcon viewBox="0 0 18 16" height={15} className={styles.icon} />
          </div>
          {/* <Button
            theme="white-blue"
            className={styles.learn}
            onClick={this.handleLearnMoreClick}
          >
            Learn More
          </Button> */}
          {isJoined && (
            <Link
              className={cn('gem-button', 'gem-button-blue', styles.assign)}
              to={`/tasks/${assignment.taskId}`}
            >
              Continue
            </Link>
          )}
          {!isJoined && (
            <EmailConfirmed user={user} onConfirmed={this.handleAssign}>
              {({ onToggle }) => (
                <Button
                  theme="blue"
                  className={styles.assign}
                  onClick={onToggle}
                >
                  Join
                </Button>
              )}
            </EmailConfirmed>
          )}
        </div>
        {topup && (
          <InsufficientFundsDialog
            user={user}
            requires={job.logic.funding.requirement}
            onHide={this.handleTopupToggle}
          />
        )}
      </div>
    );
  }
}
