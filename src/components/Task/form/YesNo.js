import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './YesNo.module.styl';

class YesNo extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };
  state = {
    selected: null,
  }

  selected = (key) => {
    this.setState({ selected: key });
    this.props.onChange(key);
  }

  render() {
    const transActive = styles.btnTransActive;
    const trans = styles.btnTrans;
    return (
      <div className={styles.YesNoContainer}>
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
    );
  }
}
export default YesNo;
