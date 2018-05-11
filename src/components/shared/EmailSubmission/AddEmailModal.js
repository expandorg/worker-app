import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../common/Modal';

import styles from './AddEmailModal.module.styl';

export default class AddEmailModal extends Component {
  static defaultProps = {
    error: null,
    onClose: null,
    confirmEmail: null,
  }

  static propTypes = {
    error: PropTypes.string,
    setEmail: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    confirmEmail: PropTypes.func,
  }

  state = {
    value: null,
    loading: false,
    submitError: false,
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

  handleSubmit = (e) => {
    e.preventDefault();
    const valid = e.target.parentElement.checkValidity();
    if (valid) {
      this.props.setEmail(this.state.value);
      this.setState({
        loading: true,
      });
      if (this.props.confirmEmail !== null) {
        this.props.confirmEmail();
      }
    } else {
      this.setState({
        submitError: true,
      });
    }
  }

  renderError() {
    if (this.state.submitError) {
      return 'Invalid Email';
    }
    return false;
  }

  renderSubmit() {
    if (this.state.loading && !this.props.error) {
      return 'Loading';
    }
    return 'Submit';
  }

  render() {
    return (
      <Modal onClose={this.props.onClose} heading="Add Email" >
        <div className={styles.container}>
          <span className={styles.description}>
            To complete tasks on Gems you will need to add your email address:
          </span>
          {this.renderError()}
          <form onSubmit={this.handleSubmit} className={styles.submitForm}>
            <label htmlFor="email">
              <input
                className={styles.input}
                onChange={this.handleChange}
                type="email"
                id="email"
                value={this.state.value || ''}
                placeholder="Email Address"
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
          </form>
        </div>
      </Modal>
    );
  }
}
