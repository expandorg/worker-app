import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles/General.module.styl';
import custom from './styles/Custom.module.styl';

import RulesModal from './modals/RulesModal';

class Rules extends Component {
  static propTypes = {
    next: PropTypes.func.isRequired,
  };

  state = {
    checked: true,
    isOpen: false,
  }

  agreeWithTerms = () => {
    this.setState({ checked: !this.state.checked });
  }

  openRulesModal = () => {
    this.setState({ isOpen: true });
  }

  closeRulesModal = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const pink = styles.btnPink;
    const disabled = styles.btnDisabled;
    return (
      <div>
        <div className={styles.taskContainer}>
          <h3>Rules</h3>
          <p className={styles.phWhiteGrey}>
            As part of the task you must understand the Medium Quality Control Guidelines.
            Please familiar yourself with these rules now and keep them in a place where you
            can easily access them. By clicking agree you agree to our terms of service, and
            are committed to perform the task to the best of your ability.
          </p>
          <div className="btn-box">
            <button className={styles.btnBlueTrans} onClick={this.openRulesModal}>
            Read rules
            </button>
          </div>
          <div className={custom.termsBox}>
            <label htmlFor="readRules">
              <span className={custom.checkmarkLabel}>
                I have read the instructions and I agree with the terms
              </span>
              <input type="checkbox" id="readRules" checked={this.state.checked} onChange={this.agreeWithTerms} />
              <span className={custom.checkmark} />
            </label>
          </div>
          <div className={custom.btnRulesBox}>
            <button
              className={this.state.checked ? pink : disabled}
              onClick={this.props.next}
              disabled={!this.state.checked}
            >
              {"Let's do this"}
            </button>
          </div>
          {this.state.isOpen ? <RulesModal confirm={this.closeRulesModal} /> : null}
        </div>
      </div>
    );
  }
}
export default Rules;
