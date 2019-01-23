import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, SubmitStateEffect } from '@expandorg/app-utils';
import { ErrorMessage } from '@expandorg/components';

import { loginMetamaskStateSelector } from '@expandorg/app-auth/selectors';
import { loginMetamask } from '@expandorg/app-auth/sagas';

import { MetamaskState } from '@expandorg/app-web3';
import { metamaskStateSelector } from '@expandorg/app-web3/selectors';

import { MetamaskPromt } from '@expandorg/app-web3/components';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  metamaskState: metamaskStateSelector(state),
  loginState: loginMetamaskStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginMetamask }, dispatch);

class MetamaskLogin extends Component {
  static propTypes = {
    metamaskState: PropTypes.string.isRequired,
    loginState: requestStateProps.isRequired,
    loginMetamask: PropTypes.func.isRequired,
  };

  state = {
    metamaskDialog: false,
    error: null,
  };

  handleHide = () => {
    this.setState({ metamaskDialog: false });
  };

  handleClick = () => {
    if (this.props.metamaskState !== MetamaskState.Authorized) {
      this.setState({ metamaskDialog: true });
    } else {
      this.props.loginMetamask();
    }
  };

  handleFailed = ({ error }) => {
    this.setState({ error });
  };

  render() {
    const { metamaskState, loginState } = this.props;
    const { metamaskDialog, error } = this.state;
    return (
      <div className={styles.container}>
        <button className={styles.button} onClick={this.handleClick}>
          <ins className={styles.fox} /> Sign in with MetaMask
        </button>
        {metamaskDialog && (
          <MetamaskPromt
            metamaskState={metamaskState}
            onLogin={this.props.loginMetamask}
            onHide={this.handleHide}
            error={error}
          />
        )}
        <ErrorMessage errors={error} className={styles.error} />
        <SubmitStateEffect
          submitState={loginState}
          onFailed={this.handleFailed}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetamaskLogin);
