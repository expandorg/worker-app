import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withSubmitState from '../../hoc/withSubmitState';
import Dialog, { DialogHeadline } from '../../common/Dialog';
import ErrorMessage from '../../common/ErrorMessage';

import { RequestStates } from '../../../common/app/requestUiState';
import { requestStateProps, userProps } from '../../shared/propTypes';

import { changePassword } from '../../../sagas/userSagas';
import { changePasswordStateSelector } from '../../../selectors/uiStateSelectors';


import styles from './EditPasswordDialog.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePassword }, dispatch);


class EditPasswordDialog extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
  }

  state = {
    password: '',
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { onSubmit, user, submitState } = this.props;
    const { password } = this.state;
    if (submitState.state !== RequestStates.Fetching) {
      onSubmit(() => this.props.changePassword(user, password));
    }
  }

  handleHide = () => {
    if (this.props.submitState.state !== RequestStates.Fetching) {
      this.props.onHide();
    }
  }

  render() {
    const { submitState } = this.props;
    const { password } = this.state;
    const isFetching = submitState.state === RequestStates.Fetching;
    const isFetchied = submitState.state === RequestStates.Fetched;

    return (
      <Dialog contentLabel="change password" visible onHide={this.handleHide} >
        <DialogHeadline>
          Change password
        </DialogHeadline>
        <div className={styles.container}>
          {!isFetchied &&
            <form className={styles.form} onSubmit={this.handleSubmit}>
              <input
                className={styles.input}
                type="password"
                placeholder="New password"
                value={password}
                onChange={({ target }) => this.setState({ password: target.value })}
              />
              <ErrorMessage error={submitState.error} className={styles.error} />
              <button type="submit" className={styles.submit}>
                {isFetching ? 'Changing password...' : 'Change password'}
              </button>
            </form>
          }
          {isFetchied &&
            <div className={styles.result}>
              Password has been changed
            </div>
          }
        </div>
      </Dialog>
    );
  }
}

export default withSubmitState(changePasswordStateSelector)(
  connect(null, mapDispatchToProps)(EditPasswordDialog),
);
