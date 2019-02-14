import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { PageDark } from '@expandorg/components/app';

import { ReactComponent as Logo } from '@expandorg/uikit/assets/logo.svg';

import MetamaskLogin from './metamask/MetamaskLogin';
import EmailLogin from './email/EmailLogin';

import { notAuthenticated } from '../shared/auth';

import './styles.styl';

class Login extends Component {
  render() {
    return (
      <PageDark title="Login">
        <div className="gem-auth-container">
          <div className="gem-auth-header">
            <Logo width={100} height={100} viewBox="0 0 50 50" />
            <h2 className="gem-auth-title">Expand</h2>
          </div>
          <div className="gem-auth-form">
            <MetamaskLogin />
            <EmailLogin />
          </div>
          <div className="gem-auth-toggle">
            Don&apos;t have an account yet?
            <Link to="/signup" className="gem-auth-link">
              Sign up here.
            </Link>
          </div>
        </div>
      </PageDark>
    );
  }
}

export default notAuthenticated(Login);
