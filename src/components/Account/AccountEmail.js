import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Clipboard from 'react-clipboard.js';


import Field from './Field';

import EmailSubmission from '../shared/EmailSubmission/EmailSubmission';

import { userProps } from '../shared/propTypes';

import styles from './AccountEmail.module.styl';

export default class AccountEmail extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
  };

  state = {
    edit: false,
  }

  handleEdit = () => {
    this.setState(({ edit }) => ({ edit: !edit }));
  }

  render() {
    const { user } = this.props;
    const { edit } = this.state;

    return (
      <Field title="Email Address">
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.address} id="address">{user.email || 'No email found'}</div>
            <Clipboard className={styles.copy} data-clipboard-text={user.email}>
              Copy
            </Clipboard>
          </div>
          <button className={styles.edit} onClick={this.handleEdit}>
            Edit
          </button>
        </div>
        {edit &&
          <EmailSubmission worker={user} onClose={this.handleEdit} />
        }
      </Field>
    );
  }
}
