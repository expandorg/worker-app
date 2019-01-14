import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Button,
  Input,
  Dialog,
  DialogHeadline,
  ErrorMessage,
} from '@expandorg/components';

import { RequestStates, requestStateProps } from '@expandorg/app-utils';
import { userProps } from '@expandorg/app-auth';

import { editEmailStateSelector } from '../../../selectors/uiStateSelectors';
import { editEmail } from '../../../sagas/userSagas';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  editState: editEmailStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editEmail }, dispatch);

class EditEmailDialog extends Component {
  static propTypes = {
    user: userProps.isRequired,
    editState: requestStateProps.isRequired,
    onHide: PropTypes.func.isRequired,
    editEmail: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email || '',
      error: null,
    };
  }

  componentWillReceiveProps({ editState: next, user: nextUser }) {
    const { editState, user } = this.props;
    if (next.error && next.error !== editState.error) {
      this.setState({ error: next.error });
    }
    if (user !== nextUser) {
      this.setState({ email: user.email });
    }
    if (
      next.state === RequestStates.Fetched &&
      editState.state === RequestStates.Fetching
    ) {
      this.props.onHide();
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const { user, editState } = this.props;
    const { email } = this.state;
    if (editState.state !== RequestStates.Fetching) {
      this.props.editEmail(user, email);
    }
  };

  render() {
    const { user, editState, onHide } = this.props;
    const { email, error } = this.state;
    const fetching = editState.state === RequestStates.Fetching;

    return (
      <Dialog visible onHide={onHide} contentLabel="edit email">
        <DialogHeadline>
          {user.email ? 'Edit Email' : 'Add Email'}
        </DialogHeadline>
        <div className={styles.container}>
          <div className={styles.description}>
            To complete tasks on Expand you will need to add your email address:
          </div>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <div className={styles.row}>
              <Input
                className={styles.input}
                onChange={({ target }) =>
                  this.setState({ email: target.value })
                }
                type="text"
                value={email}
                placeholder="Email Address"
              />
              <Button size="large" type="submit" className={styles.submit}>
                {fetching ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
          <ErrorMessage error={error} />
        </div>
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEmailDialog);
