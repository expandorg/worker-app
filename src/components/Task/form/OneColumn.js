import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './OneColumn.module.styl';

class OneColumn extends Component {
  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
    })).isRequired,
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
    const { choices } = this.props;
    return (
      <div className={styles.oneColumsContainer}>
        {choices.map((answer) => {
          const activeLink = this.state.selected === answer.key ? transActive : trans;
          return (
            <button
              className={activeLink}
              key={answer.key}
              onClick={() => this.selected(answer.key)}
            >
              <span>{answer.key}</span>
              <span>{answer.text}</span>
            </button>);
        })}
      </div>
    );
  }
}
export default OneColumn;
