import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Button,
  Input,
  Dialog,
  DialogHeadline,
  ErrorMessage,
} from '@expandorg/components';

import { RequestStates, requestStateProps } from '@expandorg/app-utils';
import { userProps } from '@expandorg/app-auth';

import { changePassword } from '@expandorg/app-account/sagas';
import { changePasswordStateSelector } from '@expandorg/app-account/selectors';

import withSubmitState from '../../hoc/withSubmitState';

import styles from './EditPasswordDialog.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePassword }, dispatch);

class EditPasswordDialog extends Component {
  static propTypes = {
    user: userProps.isRequired,
    submitState: requestStateProps.isRequired,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
  };

  state = {
    password: '',
    currentPassword: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { onSubmit, user, submitState } = this.props;
    const { password, currentPassword } = this.state;
    if (submitState.state !== RequestStates.Fetching) {
      onSubmit(() =>
        this.props.changePassword(user, password, currentPassword)
      );
    }
  };

  handleHide = () => {
    if (this.props.submitState.state !== RequestStates.Fetching) {
      this.props.onHide();
    }
  };

  render() {
    const { submitState } = this.props;
    const { password, currentPassword } = this.state;
    const isFetching = submitState.state === RequestStates.Fetching;
    const isFetchied = submitState.state === RequestStates.Fetched;

    return (
      <Dialog contentLabel="change password" visible onHide={this.handleHide}>
        <DialogHeadline>Change password</DialogHeadline>
        <div className={styles.container}>
          {!isFetchied && (
            <form className={styles.form} onSubmit={this.handleSubmit}>
              <Input
                className={styles.input}
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={({ target }) =>
                  this.setState({ currentPassword: target.value })
                }
              />
              <Input
                className={styles.input}
                type="password"
                placeholder="New password"
                value={password}
                onChange={({ target }) =>
                  this.setState({ password: target.value })
                }
              />
              <ErrorMessage
                error={submitState.error}
                className={styles.error}
              />
              <Button type="submit" className={styles.submit}>
                {isFetching ? 'Changing password...' : 'Change password'}
              </Button>
            </form>
          )}
          {isFetchied && (
            <div className={styles.result}>Password has been changed</div>
          )}
        </div>
      </Dialog>
    );
  }
}

export default withSubmitState(changePasswordStateSelector)(
  connect(
    null,
    mapDispatchToProps
  )(EditPasswordDialog)
);
