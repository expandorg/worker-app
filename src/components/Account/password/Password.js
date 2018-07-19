import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@gigs/components';

import EditPasswordDialog from './EditPasswordDialog';
import Field from '../shared/Field';

import { userProps } from '../../shared/propTypes';

import styles from './Password.module.styl';

export default class Password extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
  };

  state = {
    dialog: false,
  }

  handleChabge = () => {
    this.setState(({ dialog }) => ({ dialog: !dialog }));
  }

  render() {
    const { user } = this.props;
    const { dialog } = this.state;

    if (!user.email) {
      return null;
    }

    return (
      <Field title="Password">
        <div className={styles.container}>
          <Button theme="white" className={styles.edit} onClick={this.handleChabge}>
            Change password
          </Button>
        </div>
        {dialog &&
          <EditPasswordDialog user={user} onHide={this.handleChabge} />
        }
      </Field>
    );
  }
}
