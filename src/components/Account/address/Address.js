import React, { Component } from 'react';

import { connect } from 'react-redux';

import { metamaskStateSelector } from '@expandorg/app-web3/selectors';
import { userProps } from '@expandorg/app-auth';

import Field from '../shared/Field';
import Editable from '../shared/Editable';
import EditAddressDialoig from './EditAddressDialoig';

const mapStateToProps = state => ({
  metamaskState: metamaskStateSelector(state),
});

class Address extends Component {
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
      <Field title="Account Address">
        <Editable
          value={user.address}
          placeholder="No ethereum address found"
          onEdit={this.handleEdit}
        />
        {edit && <EditAddressDialoig user={user} onHide={this.handleEdit} />}
      </Field>
    );
  }
}

export default connect(mapStateToProps)(Address);
