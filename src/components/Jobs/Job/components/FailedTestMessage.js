import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/General.module.styl';

class FailedTestMessage extends Component {
  static propTypes = {
    confirm: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={styles.taskContainer}>
        <div>
          <h3>Sorry, you are out of tries!</h3>
          <p className={styles.phWhiteGrey}>Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Pellentesque nec maximus turpis.
            Nullam maximus eu nislsed sollicitudin elit. Pellentesque nec
            maximus turpis. Nullam maximus eu nisl sed sollicitudin
          </p>
          <div className="btn-box">
            <button className={styles.btnPink} onClick={this.props.confirm}>OK</button>
          </div>
        </div>
      </div>
    );
  }
}
export default FailedTestMessage;
