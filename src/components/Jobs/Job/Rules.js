import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from './shared/Container';
import styles from './Rules.module.styl';

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
      <Container>
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
        <div className={styles.termsBox}>
          <label htmlFor="readRules">
            <span className={styles.checkmarkLabel}>
              I have read the instructions and I agree with the terms
            </span>
            <input type="checkbox" id="readRules" checked={this.state.checked} onChange={this.agreeWithTerms} />
            <span className={styles.checkmark} />
          </label>
        </div>
        <div className={styles.btnRulesBox}>
          <button
            className={this.state.checked ? pink : disabled}
            onClick={this.props.next}
            disabled={!this.state.checked}
          >
            {"Let's do this"}
          </button>
        </div>
        {this.state.isOpen ? <RulesModal confirm={this.closeRulesModal} /> : null}
      </Container>
    );
  }
}
export default Rules;
