import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../common/Modal';

import { jobProps } from '../shared/propTypes';

import styles from './ConfirmModal.module.styl';

export default class ConfirmModal extends Component {
  static propTypes = {
    job: PropTypes.shape(jobProps).isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };

  render() {
    const { onClose, job, onConfirm } = this.props;
    return (
      <Modal
        onClose={onClose}
        heading={(
          <div>
            <span className={styles.heading}>{job.title}</span>
            <span className={styles.company}>{job.requester}</span>
          </div>
        )}
      >
        <div className={styles.screenShotDescription}>
          You will see this screen
        </div>
        <img
          className={styles.screenShot}
          src={job.imageUrl}
          alt={job.title}
        />
        <div className={styles.description}>
          {job.description}
        </div>
        <button className={styles.agree} onClick={() => onConfirm(job)}>
          Agree & Continue
        </button>
      </Modal>
    );
  }
}
