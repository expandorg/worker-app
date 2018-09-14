import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import { Button, Input, ErrorMessage } from '@gemsorg/components';
import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import withSubmitState from '../hoc/withSubmitState';

import { resetPassword } from '../../sagas/userSagas';

import { resetPasswordStateSelector as resetState } from '../../selectors/uiStateSelectors';

import styles from './styles.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ resetPassword }, dispatch);

class Password extends Component {
  static propTypes = {
    submitState: requestStateProps.isRequired,
    resetPassword: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    email: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { submitState, onSubmit } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      const { email } = this.state;
      onSubmit(() => this.props.resetPassword(email));
    }
  };

  render() {
    const { submitState } = this.props;
    const { email } = this.state;
    const isFetching = submitState.state === RequestStates.Fetching;
    const isFetched = submitState.state === RequestStates.Fetched;
    return (
      <DocumentTitle title="Restore password">
        <div className={styles.container}>
          <div className={styles.panel}>
            <h2 className={styles.title}>Restore password</h2>
            {!isFetched && (
              <form className={styles.form} onSubmit={this.handleSubmit}>
                <Input
                  className={styles.input}
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={({ target }) =>
                    this.setState({ email: target.value })
                  }
                />
                <ErrorMessage
                  error={submitState.error}
                  className={styles.error}
                />
                <Button type="submit" className={styles.submit}>
                  {isFetching ? 'Sending...' : 'Restore'}
                </Button>
              </form>
            )}
            {isFetched && (
              <div className={styles.sent}>
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
      </DocumentTitle>
    );
  }
}

export default withSubmitState(resetState)(
  connect(
    null,
    mapDispatchToProps
  )(Password)
);
