import React from 'react';
import styles from './styles/General.module.styl';
import custom from './styles/Custom.module.styl';
import Eligibility from './eligibility';
import Modal from './answers/modal';

class Rules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEligibility: false,
      checked: true,
      modalType: null,
      isOpen: false,
    };
    this.getEligibility = this.getEligibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openRulesModal = this.openRulesModal.bind(this);
  }
  getEligibility() {
    this.setState({
      showEligibility: true,
    });
  }
  handleChange() {
    if (!this.state.checked) {
      this.setState({
        checked: true,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
  }
  openRulesModal() {
    this.setState({
      modalType: 2,
      isOpen: true,
    });
  }
  render() {
    const pink = styles.btnPink;
    const disabled = styles.btnDisabled;
    return (
      <div>
        {!this.state.showEligibility ?
          <div className={styles.taskContainer}>
            <h3>Task instruction</h3>
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
                <input type="checkbox" id="readRules" checked={this.state.checked} onChange={this.handleChange} />
                <span className={custom.checkmark} />
              </label>
            </div>
            <div className={custom.btnRulesBox}>
              <button
                className={this.state.checked ? pink : disabled}
                onClick={this.getEligibility}
                disabled={!this.state.checked}
              >
                {"Let's do this"}
              </button>
            </div>
            {this.state.isOpen ?
              <Modal
                show={this.state.isOpen}
                type={this.state.modalType}
              /> : null}
          </div> : null}
        {this.state.showEligibility ? <Eligibility /> : null}
      </div>
    );
  }
}
export default Rules;
