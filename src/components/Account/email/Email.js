import React, { Component } from 'react';

import Editable from '../shared/Editable';
import Field from '../shared/Field';

import EditEmailDialog from '../../shared/email/EditEmailDialog';
import { userProps } from '../../shared/propTypes';

export default class Email extends Component {
  static propTypes = {
    user: userProps.isRequired,
  };

  state = {
    edit: false,
  };

  handleEdit = () => {
    this.setState(({ edit }) => ({ edit: !edit }));
  };

  render() {
    const { user } = this.props;
    const { edit } = this.state;

    return (
      <Field title="Email Address">
        <Editable
          value={user.email}
          placeholder="No email found"
          onEdit={this.handleEdit}
        />
        {edit && <EditEmailDialog user={user} onHide={this.handleEdit} />}
      </Field>
    );
  }
}
