import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Dialog } from '@expandorg/components';

import MetamaskSignup from './metamask/MetamaskSignup';
import EmailSignup from './email/EmailSignup';

import { notAuthenticated } from '../shared/auth';

import styles from './AuthDialog.module.styl';

function AuthDialog({ onHide }) {
  return (
    <Dialog visible onHide={onHide} contentLabel="auth-dialog">
      <div className={styles.container}>
        <div className={styles.form}>
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
    </Dialog>
  );
}

export default notAuthenticated(AuthDialog);

AuthDialog.propTypes = {
  onHide: PropTypes.func.isRequired,
};
