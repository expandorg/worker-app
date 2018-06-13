import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DocumentTitle from 'react-document-title';

import ErrorMessage from '../common/ErrorMessage';
import withSubmitState from '../hoc/withSubmitState';

import { requestStateProps } from '../shared/propTypes';
import { RequestStates } from '../../common/app/requestUiState';

import { resetPassword } from '../../sagas/userSagas';

import { resetPasswordStateSelector as resetState } from '../../selectors/uiStateSelectors';

import styles from './styles.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ resetPassword }, dispatch);

class Password extends Component {
  static propTypes = {
    submitState: PropTypes.shape(requestStateProps).isRequired,
    resetPassword: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    email: '',
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { submitState, onSubmit } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      const { email } = this.state;
      onSubmit(() => this.props.resetPassword(email));
    }
  }

  render() {
    const { submitState } = this.props;
    const { email } = this.state;
    const isFetching = submitState.state === RequestStates.Fetching;
    const isFetched = submitState.state === RequestStates.Fetched;
    return (
      <DocumentTitle title="Restore password">
        <div className={styles.container}>
          <div className={styles.panel}>
            <h2 className={styles.title}>
              Restore password
            </h2>
            {!isFetched &&
              <form className={styles.form} onSubmit={this.handleSubmit}>
                <input
                  className={styles.input}
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={({ target }) => this.setState({ email: target.value })}
                />
                <ErrorMessage error={submitState.error} className={styles.error} />
                <button type="submit" className={styles.submit}>
                  {isFetching ? 'Sending...' : 'Restore'}
                </button>
              </form>
            }
            {isFetched &&
              <div className={styles.message}>
                Check your mail yo get instructions on how to reset your password
              </div>
            }
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default withSubmitState(resetState)(connect(null, mapDispatchToProps)(Password));
