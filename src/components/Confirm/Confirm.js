import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/Modal';

import { workerProps, routerProps, locationProps } from '../shared/propTypes';

import styles from './Confirm.module.styl';

export default class Confirm extends Component {
  static propTypes = {
    error: PropTypes.string,
    confirmEmail: PropTypes.func.isRequired,
    resendConfirmEmail: PropTypes.func.isRequired,
    worker: PropTypes.shape(workerProps),
    router: PropTypes.shape(routerProps).isRequired,
    location: PropTypes.shape(locationProps),
  }

  static defaultProps = {
    error: null,
    worker: null,
    location: null,
  }

  constructor(props) {
    super(props);
    if (this.props.worker.confirmed) {
      this.props.router.replace('/jobs');
    }
    const { location } = this.props;
    const { query } = location;
    const { code } = query;
    if (code) {
      this.state = {
        value: code,
        loading: true,
      };
      this.props.confirmEmail(code);
    } else {
      this.state = {
        value: null,
        loading: false,
      };
    }
  }

  componentDidUpdate() {
    if (this.props.worker.confirmed) {
      this.props.router.replace('/jobs');
    }
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
        heading={(
          <div>
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
