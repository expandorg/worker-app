import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { Button, Input, ErrorMessage } from '@expandorg/components';
import { PageDark, Navbar } from '@expandorg/components/app';
import {
  RequestStates,
  requestStateProps,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { resetPassword } from '@expandorg/app-auth/sagas';
import { resetPasswordStateSelector } from '@expandorg/app-auth/selectors';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  submitState: resetPasswordStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ resetPassword }, dispatch);

class ResetPassword extends Component {
  static propTypes = {
    submitState: requestStateProps.isRequired,
    resetPassword: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    isFetched: false,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { submitState } = this.props;

    if (submitState.state !== RequestStates.Fetching) {
      const { email } = this.state;
      this.props.resetPassword(email);
    }
  };

  handleResetted = () => {
    this.setState({ isFetched: true });
  };

  render() {
    const { submitState } = this.props;
    const { email, isFetched } = this.state;

    const isFetching = submitState.state === RequestStates.Fetching;

    return (
      <PageDark title="Restore password">
        <Navbar title="Restore password" theme="dark" top={false} />
        <div className={styles.container}>
          <div className={styles.panel}>
            <h2 className={styles.title}>Restore password</h2>
            {!isFetched && (
              <form className={styles.form} onSubmit={this.handleSubmit}>
                <Input
                  theme="white"
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={({ target }) =>
                    this.setState({ email: target.value })
                  }
                />
                <ErrorMessage
                  errors={submitState.error}
                  className={styles.error}
                />
                <div className={styles.actions}>
                  <Button type="submit" className={styles.submit}>
                    {isFetching ? 'Sending...' : 'Restore'}
                  </Button>
                </div>
              </form>
            )}
            {isFetched && (
              <div className={styles.result}>
                <p className={styles.message}>
                  Check your mail to get instructions on how to reset your
                  password
                </p>
                <Link to="/login" className={styles.link}>
                  Return to signin
                </Link>
              </div>
            )}
          </div>
        </div>
        <SubmitStateEffect
          submitState={submitState}
          onComplete={this.handleResetted}
        />
      </PageDark>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
