import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Modal from './Modal';
import { BORDER_R, PADDING } from '../style-constants';

const styles = {
  container: css({
    textAlign: 'center',
    display: 'block',
  }),
  description: css({
    margin: '5%',
    display: 'block',
  }),
  input: css({
    width: 'calc(100% - 200px)',
    minWidth: '200px',
    height: '50px',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    border: 'solid 1px #e0e0e0',
    display: 'inline-block',
    fontSize: '16px',
    textAlign: 'left',
    paddingLeft: '15px',
    color: '#b8b8b8',
    '::placeholder': {
      fontSize: '16px',
      textAlign: 'left',
      color: '#b8b8b8',
    },
    ':focus': {
      outline: '0',
    },
  }),
  submitForm: css({
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    marginBottom: PADDING,
    width: '80%',
  }),
  submit: css({
    width: '119px',
    height: '50px',
    borderRadius: BORDER_R,
    backgroundColor: '#ff7092',
    display: 'inline-block',
    fontSize: '18px',
    letterSpacing: '-0.7px',
    textAlign: 'center',
    color: '#ffffff',
    marginLeft: '8px',
    border: '0',
    cursor: 'pointer',
    ':focus': {
      outline: '0',
    },
    ':hover': {
      backgroundImage: 'linear-gradient(to bottom right,#ff7092,#FF8EA9)',
    },
    ':disabled': {
      backgroundColor: '#f2f2f2',
      ':hover': {
        backgroundImage: 'none',
      },
    },
  }),
  resend: css({
    marginLeft: '5px',
  }),
  backBtn: css({
    border: 'none',
    verticalAlign: 'middle',
  }),
};

class ConfirmEmailModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      value: null,
      loading: false,
    };
  }

  handleChange(e) {
    if (!this.state.loading) {
      this.setState({
        value: e.target.value.trim(),
        loading: false,
      });
    } else {
      this.setState({ value: e.target.value.trim() });
    }
  }

  handleResubmit(e) {
    e.preventDefault();
    this.props.resendConfirmEmail();
  }

  handleSubmit(e) {
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
            <button href="#" className={styles.backBtn} onClick={this.props.editEmail}>
              <img src="../images/back-btn.svg" alt="Back" />
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

ConfirmEmailModal.defaultProps = {
  error: null,
  toggleModal: null,
  submitConfirm: null,
};

ConfirmEmailModal.propTypes = {
  error: PropTypes.string,
  confirmEmail: PropTypes.func.isRequired,
  resendConfirmEmail: PropTypes.func.isRequired,
  editEmail: PropTypes.func.isRequired,
  toggleModal: PropTypes.func,
  submitConfirm: PropTypes.func,
};

export default ConfirmEmailModal;
