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
};

class AddEmailModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      value: null,
      loading: false,
      submitError: false,
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

  handleSubmit(e) {
    e.preventDefault();
    const valid = e.target.parentElement.checkValidity();
    if (valid) {
      this.props.setEmail(this.state.value);
      this.setState({
        loading: true,
      });
    } else {
      this.setState({
        submitError: true,
      });
      console.log(this.state.submitError);
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
      <Modal
        heading={(
          <div>
            <span>Add Email</span>
          </div>
        )}
      >
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
          <a
            href="http://gems.org#"
            className={styles.description}
          >
            Why do you need my email address?
          </a>
          <br />
        </div>
      </Modal>
    );
  }
}

AddEmailModal.defaultProps = {
  error: null,
};

AddEmailModal.propTypes = {
  error: PropTypes.string,
  setEmail: PropTypes.func.isRequired,
};

export default AddEmailModal;
