import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../common/Modal';

import styles from './ConfirmEmailModal.styles';

export default class ConfirmEmailModal extends Component {
  static propTypes = {
    error: PropTypes.string,
    confirmEmail: PropTypes.func.isRequired,
    resendConfirmEmail: PropTypes.func.isRequired,
    editEmail: PropTypes.func.isRequired,
    toggleModal: PropTypes.func,
    submitConfirm: PropTypes.func,
  }

  static defaultProps = {
    error: null,
    toggleModal: null,
    submitConfirm: null,
  }

  state = {
    value: null,
    loading: false,
  }

  handleChange = (e) => {
    if (!this.state.loading) {
      this.setState({
        value: e.target.value.trim(),
        loading: false,
      });
    } else {
      this.setState({ value: e.target.value.trim() });
    }
  }

  handleResubmit = (e) => {
    e.preventDefault();
    this.props.resendConfirmEmail();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const valid = e.target.parentElement.checkValidity();
    if (valid) {
      this.props.confirmEmail(this.state.value);
      this.setState({
        loading: true,
      });
      this.props.submitConfirm();
    }
  }

  renderSubmit() {
    if (this.state.loading && !this.props.error) {
      return 'Loading';
    }
    return 'Submit';
  }

  render() {
    return (
      <Modal
        toggleModal={this.props.toggleModal}
        heading={(
          <div>
            <button className={styles.backBtn} onClick={this.props.editEmail}>
              <img src="/images/back-btn.svg" alt="Back" />
            </button>
            <span>Confirm Email</span>
          </div>
        )}
      >
        <div className={styles.container}>
          <span className={styles.description}>
            Enter the confirmation code that was sent to your email
          </span>
          <form onSubmit={this.handleSubmit} className={styles.submitForm}>
            <label htmlFor="text">
              <input
                className={styles.input}
                onChange={this.handleChange}
                type="text"
                id="text"
                value={this.state.value || ''}
                placeholder="Confirmation Code"
              />
            </label>
            <button
              type="submit"
              className={styles.submit}
              onClick={this.handleSubmit}
              disabled={this.state.value === null || this.state.value === '' || (this.state.loading && !this.props.error)}
            >
              {this.renderSubmit()}
            </button>
            <br />
            {"Didn't get the email? We can"}
            <button className={styles.resend} onClick={this.handleResubmit}>Resend</button>
          </form>
        </div>
      </Modal>
    );
  }
}
