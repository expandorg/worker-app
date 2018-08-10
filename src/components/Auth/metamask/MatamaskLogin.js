import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, ErrorMessage } from '@gemsorg/components';

import MetamaskPromt from '../../shared/metamask/MetamaskPromt';

import { metamaskStateSelector } from '../../../selectors/web3Selectors';
import { loginMetamaskStateSelector } from '../../../selectors/uiStateSelectors';
import { loginMetamask } from '../../../sagas/authSagas';

import { requestStateProps } from '../../shared/propTypes';
import { MetamaskState } from '../../../model/enums';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  metamaskState: metamaskStateSelector(state),
  loginState: loginMetamaskStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginMetamask }, dispatch);

class MatamaskLogin extends Component {
  static propTypes = {
    metamaskState: PropTypes.string.isRequired,
    loginState: PropTypes.shape(requestStateProps).isRequired,
    loginMetamask: PropTypes.func.isRequired,
  }

  state = {
    metamaskDialog: false,
    error: null,
  }

  componentWillReceiveProps({ loginState: nextState }) {
    const { loginState } = this.props;
    if (nextState.error && nextState.error !== loginState.error) {
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
      this.props.loginMetamask();
    }
  }

  render() {
    const { metamaskState } = this.props;
    const { metamaskDialog, error } = this.state;
    return (
      <div className={styles.container}>
        <Button
          size="large"
          theme="blue"
          className={styles.login}
          onClick={this.handleClick}
        >
          <ins className={styles.fox} /> Login with MetaMask
        </Button>
        {metamaskDialog &&
          <MetamaskPromt
            metamaskState={metamaskState}
            onLogin={this.props.loginMetamask}
            onHide={this.handleHide}
            error={error}
          />
        }
        <ErrorMessage error={error} className={styles.error} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatamaskLogin);
