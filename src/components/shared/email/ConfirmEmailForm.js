import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RequestStates } from '../../../common/app/requestUiState';
import ErrorMessage from '../../common/ErrorMessage';

import { confirmEmailStateSelector, resendConfirmEmailStateSelector } from '../../../selectors/uiStateSelectors';
import { confirmEmail, resendConfirmEmail } from '../../../sagas/userSagas';

import { userProps, requestStateProps } from '../propTypes';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  confirmState: confirmEmailStateSelector(state),
  resendState: resendConfirmEmailStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ confirmEmail, resendConfirmEmail }, dispatch);

class ConfirmEmailForm extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    code: PropTypes.string,
    confirmState: PropTypes.shape(requestStateProps).isRequired,
    resendState: PropTypes.shape(requestStateProps).isRequired,
    confirmEmail: PropTypes.func.isRequired,
    resendConfirmEmail: PropTypes.func.isRequired,
    onComplete: PropTypes.func,
  };

  static defaultProps = {
    code: null,
    onComplete: Function.prototype,
  }

  constructor(props) {
    super(props);
    this.state = {
      code: props.code || '',
      error: null,
    };
  }

  componentDidMount() {
    const { code, user } = this.props;
    if (code) {
      this.props.confirmEmail(user, code);
    }
  }

  componentWillReceiveProps({ confirmState: nextConfirm }) {
    const { confirmState } = this.props;
    if (nextConfirm.error && nextConfirm.error !== confirmState.error) {
      this.setState({ error: nextConfirm.error });
    }
    if (nextConfirm.state === RequestStates.Fetched &&
        confirmState.state === RequestStates.Fetching) {
      this.props.onComplete();
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { user, confirmState } = this.props;
    const { code } = this.state;
    if (confirmState.state !== RequestStates.Fetching) {
      this.props.confirmEmail(user, code);
    }
  }

  handleResend = (evt) => {
    evt.preventDefault();
    const { user, resendState } = this.props;
    if (resendState.state !== RequestStates.Fetching) {
      this.props.resendConfirmEmail(user);
    }
  }

  render() {
    const {
      confirmState, resendState,
    } = this.props;
    const { code, error } = this.state;

    const confirming = confirmState.state === RequestStates.Fetching;
    const resending = resendState.state === RequestStates.Fetching;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <div className={styles.row}>
          <input
            className={styles.input}
            onChange={({ target }) => this.setState({ code: target.value })}
            type="text"
            value={code}
            placeholder="Confirmation Code"
          />
          <button type="submit" className={styles.submit}>
            {confirming ? 'Confirm...' : 'Confirm'}
          </button>
        </div>
        <ErrorMessage error={error} />
        <div className={styles.resend}>
          <span className={styles.resendText}>
            Didn&apos;t get the email? We can
          </span>
          <button className={styles.resendButton} onClick={this.handleResend}>
            {resending ? 'resending...' : 'resend'}
          </button>
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailForm);
