import React, { Component } from 'react';
import PropTypes from 'prop-types';

import qs from 'query-string';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Input, ErrorMessage } from '@expandorg/components';
import { PageDark, Navbar } from '@expandorg/components/app';
import {
  RequestStates,
  requestStateProps,
  locationProps,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { restorePassword } from '@expandorg/app-auth/sagas';
import { restorePasswordStateSelector } from '@expandorg/app-auth/selectors';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  submitState: restorePasswordStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ restorePassword }, dispatch);

class RestorePassword extends Component {
  static propTypes = {
    submitState: requestStateProps.isRequired,
    location: locationProps.isRequired,
    restorePassword: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const query = qs.parse(props.location.search);
    this.state = {
      password: '',
      code: query.code || '',
      isFetched: false,
    };
  }

  handleRestored = () => {
    this.setState({ isFetched: true });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { submitState } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      const { password, code } = this.state;
      this.props.restorePassword(password, code);
    }
  };

  render() {
    const { submitState } = this.props;
    const { password, code, isFetched } = this.state;

    return (
      <PageDark title="Restore password">
        <Navbar title="Restore password" theme="dark" top={false} />
        <div className={styles.container}>
          <div className={styles.panel}>
            <h2 className={styles.title}>Change password</h2>
            {!isFetched && (
              <form className={styles.form} onSubmit={this.handleSubmit}>
                <Input
                  theme="white"
                  type="text"
                  required
                  placeholder="Confirmation code"
                  value={code}
                  onChange={({ target }) =>
                    this.setState({ code: target.value })
                  }
                />
                <Input
                  theme="white"
                  type="password"
                  required
                  placeholder="New password"
                  value={password}
                  onChange={({ target }) =>
                    this.setState({ password: target.value })
                  }
                />
                <ErrorMessage
                  errors={submitState.error}
                  className={styles.error}
                />
                <div className={styles.actions}>
                  <Button type="submit" className={styles.submit}>
                    Change password
                  </Button>
                </div>
              </form>
            )}
            {isFetched && (
              <div className={styles.result}>
                <p className={styles.message}>Your password has been changed</p>
                <Link to="/login" className={styles.link}>
                  Return to signin
                </Link>
              </div>
            )}
          </div>
          <SubmitStateEffect
            submitState={submitState}
            onComplete={this.handleRestored}
          />
        </div>
      </PageDark>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestorePassword);
