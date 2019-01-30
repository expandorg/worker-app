import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ErrorMessage } from '@expandorg/components';

import { requestStateProps, SubmitStateEffect } from '@expandorg/app-utils';
import { signupMetamaskStateSelector } from '@expandorg/app-auth/selectors';
import { signupMetamask } from '@expandorg/app-auth/sagas';

import { metamaskStateSelector } from '@expandorg/app-web3/selectors';
import { MetamaskPromt } from '@expandorg/app-web3/components';
import { MetamaskState } from '@expandorg/app-web3';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  metamaskState: metamaskStateSelector(state),
  signupState: signupMetamaskStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signupMetamask }, dispatch);

class MetamaskSignup extends Component {
  static propTypes = {
    metamaskState: PropTypes.string.isRequired,
    signupState: requestStateProps.isRequired,
    signupMetamask: PropTypes.func.isRequired,
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
      this.props.signupMetamask();
    }
  };

  handleFailed = ({ error }) => {
    this.setState({ error });
  };

  render() {
    const { metamaskState, signupState } = this.props;
    const { metamaskDialog, error } = this.state;
    return (
      <div className={styles.container}>
        <button className={styles.button} onClick={this.handleClick}>
          <ins className={styles.fox} /> Sign up with MetaMask
        </button>
        {metamaskDialog && (
          <MetamaskPromt
            metamaskState={metamaskState}
            onLogin={this.props.signupMetamask}
            onHide={this.handleHide}
            action="Sign up"
            error={error}
          />
        )}
        <ErrorMessage errors={error} className={styles.error} />
        <SubmitStateEffect
          submitState={signupState}
          onFailed={this.handleFailed}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetamaskSignup);
