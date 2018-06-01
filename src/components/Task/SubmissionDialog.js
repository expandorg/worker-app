import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Dialog, { DialogHeadline } from '../common/Dialog';

import styles from './SubmissionDialog.module.styl';

export default class SubmissionDialog extends Component {
  static propTypes = {
    isFunded: PropTypes.bool.isRequired,
  };

  render() {
    const { isFunded } = this.props;

    return (
      <Dialog visible hideButton contentLabel="submit task" >
        <DialogHeadline>
          Task Submitted
        </DialogHeadline>
        <div className={styles.container}>
          <div className={styles.heading}>
            Submission successful!
          </div>
          {!isFunded &&
            <div>
              Your Gems balance is not high enough to submit more tasks.<br />
              Please deposit more Gems to submit again.
            </div>
          }
          <div className={styles.heading}>
            <Link to="/jobs">Browse available jobs</Link>
          </div>
        </div>
      </Dialog>
    );
  }
}
