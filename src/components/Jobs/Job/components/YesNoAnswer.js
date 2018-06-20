import React, { Component } from 'react';
import PropTypes from 'prop-types';

import general from '../styles/General.module.styl';
import styles from './Column.module.styl';

class YesNoAnswers extends Component {
  static propTypes = {
    answered: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  state = {
    selected: null,
  }

  selected = (key) => {
    this.setState({ selected: key });
    this.props.answered(key);
  }

  render() {
    const transActive = general.btnTransActive;
    const trans = general.btnTrans;
    return (
      <div className="">
        <p className={styles.phDarkGrey}>{this.props.text}</p>
        <div className={styles.btnYesNoBox}>
          <button
            className={this.state.selected === 'YES' ? transActive : trans}
            onClick={() => this.selected('YES')}
          >Yes
          </button>
          <button
            className={this.state.selected === 'NO' ? transActive : trans}
            onClick={() => this.selected('NO')}
          >No
          </button>
        </div>
      </div>
    );
  }
}
export default YesNoAnswers;
