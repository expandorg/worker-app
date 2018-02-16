import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import Modal from './Modal';
import { BORDER_R, PADDING } from '../style-constants';

const MIN_DEPOSIT = 5;
const MAX_DEPOSIT = 1000;

const styles = {
  container: css({
    textAlign: 'center',
    display: 'block',
  }),
  description: css({
    margin: '5%',
    display: 'block',
  }),
  loading: css({
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    marginBottom: PADDING,
    padding: `${PADDING}px 0`,
    width: '80%',
    background: '#ffb8c8',
  }),
  form: css({
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    marginBottom: PADDING,
    width: '80%',
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
    marginRight: '15px',
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

class DepositModal extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      value: '',
      loading: false,
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value < MIN_DEPOSIT || this.state.value > MAX_DEPOSIT) {
      return;
    }
    this.setState({ loading: true });
    const value = parseFloat(this.state.value);
    this.props.depositGems(value)
      .then(() => {
        this.props.toggleModal();
      });
  }

  renderLoading() {
    return (
      <div className={styles.loading}>
        Processing transaction:<br />
        Depositing {this.state.value} Gems
      </div>
    );
  }

  renderForm() {
    return (
      <form
        className={styles.form}
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="deposit">
          <input
            className={styles.input}
            type="number"
            id="deposit"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Amount of Gems to deposit"
          />
        </label>
        <button
          type="submit"
          className={styles.submit}
          disabled={this.state.value < MIN_DEPOSIT}
        >
          Deposit
        </button>
      </form>
    );
  }

  render() {
    return (
      <Modal
        heading={<span>Deposit Gems</span>}
        toggleModal={this.props.toggleModal}
      >
        <div className={styles.container}>
          <span className={styles.description}>
            In order to submit tasks you will first need to deposit at least 5 Gems
            (and at most 1000 Gems).<br />
            You will not lose these Gems even if your tasks are not accepted,
            and you can withdraw them again once your total balance is at least 500 Gems.
          </span>
          {this.state.loading && this.renderLoading()}
          {this.state.loading || this.renderForm()}
        </div>
      </Modal>
    );
  }
}

DepositModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  depositGems: PropTypes.func.isRequired,
};

export default DepositModal;
