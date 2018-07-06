import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from '../shared/Container';
import styles from './FailedMessage.module.styl';

class FailedMessage extends Component {
  static propTypes = {
    confirm: PropTypes.func.isRequired,
    pointsNedded: PropTypes.number.isRequired,
    pointsWon: PropTypes.number.isRequired,
  };

  render() {
    return (
      <Container>
        <div>
          <h3>Sorry you did not get the necessary points to go further</h3>
          <p className={styles.phWhiteBlue}>Minimum points to pass the test is
            <span className={styles.pinkColor}>{this.props.pointsNedded}</span> points. You won
            <span className={styles.pinkColor}>{this.props.pointsWon}</span>  points.
          </p>
          <p className={styles.phWhiteGrey}>Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Pellentesque nec maximus turpis.
            Nullam maximus eu nislsed sollicitudin elit. Pellentesque nec
            maximus turpis. Nullam maximus eu nisl sed sollicitudin
          </p>
          <div className="btn-box">
            <button className={styles.btnPink} onClick={this.props.confirm}>OK</button>
          </div>
        </div>
      </Container>
    );
  }
}
export default FailedMessage;
