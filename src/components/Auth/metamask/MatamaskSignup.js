import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, ErrorMessage } from '@gigs/components';

import MetamaskPromt from '../../shared/metamask/MetamaskPromt';

import { metamaskStateSelector } from '../../../selectors/web3Selectors';
import { signupMetamaskStateSelector } from '../../../selectors/uiStateSelectors';
import { signupMetamask } from '../../../sagas/authSagas';

import { requestStateProps } from '../../shared/propTypes';
import { MetamaskState } from '../../../model/enums';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  metamaskState: metamaskStateSelector(state),
  signupState: signupMetamaskStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signupMetamask }, dispatch);

class MatamaskLogin extends Component {
  static propTypes = {
    metamaskState: PropTypes.string.isRequired,
    signupState: PropTypes.shape(requestStateProps).isRequired,
    signupMetamask: PropTypes.func.isRequired,
  }

  state = {
    metamaskDialog: false,
    error: null,
  }

  componentWillReceiveProps({ signupState: nextState }) {
    const { signupState } = this.props;
    if (nextState.error && nextState.error !== signupState.error) {
      this.setState({ error: nextState.error });
    }
  }

  handleHide = () => {
    this.setState({ metamaskDialog: false });
  }

  handleClick = () => {
    if (this.props.metamaskState !== MetamaskState.Authorized) {
      this.setState({ metamaskDialog: true });
    } else {
      this.props.signupMetamask();
    }
  }

  render() {
    const { metamaskState } = this.props;
    const { metamaskDialog, error } = this.state;
    return (
      <div className={styles.container}>
        <Button
          theme="blue"
          size="large"
          className={styles.login}
          onClick={this.handleClick}
        >
          <ins className={styles.fox} /> Signup with MetaMask
        </Button>
        {metamaskDialog &&
          <MetamaskPromt
            metamaskState={metamaskState}
            onLogin={this.props.signupMetamask}
            onHide={this.handleHide}
            action="Sign up"
            error={error}
          />
        }
        <ErrorMessage error={error} className={styles.error} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatamaskLogin);
