import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { PageDark } from '@expandorg/components/app';
import { ReactComponent as Logo } from '@expandorg/uikit/assets/logo.svg';

import MetamaskSignup from './metamask/MetamaskSignup';
import EmailSignup from './email/EmailSignup';

import { notAuthenticated } from '../shared/auth';

import './styles.styl';

class Signup extends Component {
  render() {
    return (
      <PageDark title="Signup">
        <div className="gem-auth-container">
          <div className="gem-auth-header">
            <Logo width={100} height={100} viewBox="0 0 50 50" />
            <h2 className="gem-auth-title">Expand</h2>
          </div>
          <div className="gem-auth-form">
            <MetamaskSignup />
            <EmailSignup />
          </div>
          <div className="gem-auth-toggle">
            Already have an account?
            <Link to="/login" className="gem-auth-link">
              Sign in here.
            </Link>
          </div>
        </div>
      </PageDark>
    );
  }
}

export default notAuthenticated(Signup);
