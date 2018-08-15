import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Dialog, DialogHeadline } from '@gemsorg/components';

import styles from './SubmissionDialog.module.styl';

export default class SubmissionDialog extends Component {
  render() {
    return (
      <Dialog visible hideButton contentLabel="submit task" >
        <DialogHeadline>
          Task Submitted
        </DialogHeadline>
        <div className={styles.container}>
          <div className={styles.heading}>
            Submission successful!
          </div>
          <div className={styles.finished}>
            <Link to="/jobs" className={styles.browse}>Browse available jobs</Link>
          </div>
        </div>
      </Dialog>
    );
  }
}
