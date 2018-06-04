import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConfirmEmailForm from './ConfirmEmailForm';
import Dialog, { DialogHeadline } from '../../common/Dialog';

import { userProps } from '../propTypes';

import styles from './styles.module.styl';

export default class ConfirmEmailDialog extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    onHide: PropTypes.func.isRequired,
  };

  handleConfirm = () => {
    this.props.onHide();
  }

  render() {
    const { onHide, user } = this.props;

    return (
      <Dialog visible onHide={onHide} contentLabel="confirm email" >
        <DialogHeadline>
          Confirm Email
        </DialogHeadline>
        <div className={styles.container}>
          <div className={styles.description}>
            Enter the confirmation code that was sent to your email
          </div>
          <ConfirmEmailForm user={user} onComplete={this.handleConfirm} />
        </div>
      </Dialog>
    );
  }
}
