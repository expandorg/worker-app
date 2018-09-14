import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DocumentTitle from 'react-document-title';

import { Button, Input, ErrorMessage } from '@gemsorg/components';
import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import withSubmitState from '../hoc/withSubmitState';

import { locationProps } from '../shared/propTypes';

import { restorePassword } from '../../sagas/userSagas';

import { restorePasswordStateSelector as restoreState } from '../../selectors/uiStateSelectors';

import styles from './styles.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ restorePassword }, dispatch);

class Restore extends Component {
  static propTypes = {
    submitState: requestStateProps.isRequired,
    location: PropTypes.shape(locationProps).isRequired,
    restorePassword: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const query = qs.parse(props.location.search);
    this.state = {
      password: '',
      code: query.code || '',
    };
  }

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
    const { password, code } = this.state;

    const isFetching = submitState.state === RequestStates.Fetching;
    // const isFetched = submitState.state === RequestStates.Fetched;
    return (
      <DocumentTitle title="Change password">
        <div className={styles.container}>
          <div className={styles.panel}>
            <h2 className={styles.title}>Change password</h2>
            <form className={styles.form} onSubmit={this.handleSubmit}>
              <div className={styles.label}>Confirmation code:</div>
              <Input
                className={styles.input}
                type="text"
                required
                placeholder="Confirmation code"
                value={code}
                onChange={({ target }) => this.setState({ code: target.value })}
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
          </div>
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
