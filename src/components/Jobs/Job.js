import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Modal from '../common/Modal';

import { workerProps, statsProps } from '../shared/propTypes';

import { isWorkerFunded } from '../../model/worker';

import styles from './Job.styles';

const TITLE = 'Trivia Question and Answer Creation';
const REQUESTER = 'Stream Live Inc';
const DESCRIPTION = 'Write a trivia question with three multiple-choice answers. One answer should be correct and fact-checked, and two answers should be incorrect.';

export default class Job extends PureComponent {
  static propTypes = {
    replace: PropTypes.func.isRequired,
    setIsJoined: PropTypes.func.isRequired,
    error: PropTypes.string,
    worker: PropTypes.shape(workerProps),
    stats: PropTypes.shape(statsProps).isRequired,
  };

  static defaultProps = {
    error: null,
    worker: null,
  }

  state = {
    isModalOpen: false,
    loading: false,
  }

  agree = () => {
    this.setState({ loading: true });
    this.props.setIsJoined(true);
    this.props.replace('/task');
    // this.props.joinJob();
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  renderJoinButton() {
    if (!isWorkerFunded(this.props.worker, this.props.stats)) {
      return <div>Please deposit Gems to participate*</div>;
    }
    return <button onClick={this.toggleModal} className={styles.joinBtn}>Join</button>;
  }

  renderText() {
    if (this.state.loading && !this.props.error) {
      return 'Loading';
    }
    if (this.props.error) {
      return 'Error';
    }
    return 'Agree & Continue';
  }

  renderStatus() {
    return (
      <div>
        {this.renderJoinButton()}
        <div className={styles.rewardMobile}>
          <span className={styles.rewardNumber}>1</span>
          <img className={styles.rewardIcon} src="/images/logo.svg" alt="Gems" />
        </div>
        {
          this.state.isModalOpen &&
          <Modal
            toggleModal={this.toggleModal}
            heading={(
              <div>
                <span className={styles.modalHeading}>{TITLE}</span>
                <span className={styles.modalCompany}>{REQUESTER}</span>
              </div>
            )}
          >
            <span className={styles.screenShotDescription}>You will see this screen </span>
            <img className={styles.screenShot} src="/images/trivia-screen.png" alt="screenshot" />
            <span className={styles.description}>{DESCRIPTION}</span>
            <button
              className={styles.agreeBtn}
              onClick={() => this.agree()}
              disabled={this.state.loading || this.props.error}
            >
              {this.renderText()}
            </button>
          </Modal>
        }
      </div>
    );
  }

  render() {
    return (
      <div className={styles.job}>
        <img
          className={styles.jobLogo}
          src="/images/the-q.jpg"
          alt={REQUESTER}
        />
        <div className={styles.jobInfo}>
          <div className={styles.jobHeading}>{TITLE}</div>
          <div className={styles.jobRequester}>{REQUESTER}</div>
          {this.renderStatus()}
        </div>
        <div className={styles.reward}>
          <span className={styles.rewardNumber}>1</span>
          <img className={styles.rewardIcon} src="https://gems.org/images/logo.svg" alt="Gems" />
        </div>
      </div>
    );
  }
}
