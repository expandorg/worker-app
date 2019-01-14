import React, { Component } from 'react';
import PropTypes from 'prop-types';

import qs from 'query-string';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DocumentTitle from 'react-document-title';

import { Button, Input, ErrorMessage } from '@expandorg/components';
import {
  RequestStates,
  requestStateProps,
  locationProps,
} from '@expandorg/app-utils';

import withSubmitState from '../hoc/withSubmitState';
import submitStateEffect from '../hoc/submitStateEffect';

import { restorePassword } from '../../sagas/userSagas';

import { restorePasswordStateSelector as restoreState } from '../../selectors/uiStateSelectors';

import styles from './styles.module.styl';

const SubmitRestoreEffect = submitStateEffect(restoreState);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ restorePassword }, dispatch);

class Restore extends Component {
  static propTypes = {
    submitState: requestStateProps.isRequired,
    location: locationProps.isRequired,
    restorePassword: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const query = qs.parse(props.location.search);
    this.state = {
      password: '',
      code: query.code || '',
      submitted: false,
    };
  }

  handleRestored = () => {
    this.setState({ submitted: true });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { submitState, onSubmit } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      const { password, code } = this.state;
      onSubmit(() => this.props.restorePassword(password, code));
    }
  };

  render() {
    const { submitState } = this.props;
    const { password, code, submitted } = this.state;

    const isFetching = submitState.state === RequestStates.Fetching;
    return (
      <DocumentTitle title="Change password">
        <div className={styles.container}>
          <div className={styles.panel}>
            <h2 className={styles.title}>Change password</h2>
            {!submitted && (
              <form className={styles.form} onSubmit={this.handleSubmit}>
                <div className={styles.label}>Confirmation code:</div>
                <Input
                  className={styles.input}
                  type="text"
                  required
                  placeholder="Confirmation code"
                  value={code}
                  onChange={({ target }) =>
                    this.setState({ code: target.value })
                  }
                />
                <div className={styles.label}>New password:</div>
                <Input
                  className={styles.input}
                  type="password"
                  required
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
            {submitted && (
              <div className={styles.sent}>
                <p className={styles.message}>Your password has been changed</p>
                <Link to="/login" className={styles.link}>
                  Return to signin
                </Link>
              </div>
            )}
          </div>
          <SubmitRestoreEffect onComplete={this.handleRestored} />
        </div>
      </DocumentTitle>
    );
  }
}

export default withSubmitState(restoreState)(
  connect(
    null,
    mapDispatchToProps
  )(Restore)
);
