import React, { Component } from 'react';
import PropTypes from 'prop-types';

import general from '../styles/General.module.styl';
import styles from '../modals/Answers.module.styl';

class TwoColumsAnswers extends Component {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
    })).isRequired,
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
      <div>
        {!this.state.message ?
          <div>
            <p className={styles.phDarkGrey}>{this.props.text}</p>
            <div className={styles.oneColumn}>
              {this.props.answers.map((answer) => {
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
          </div> : null}
      </div>
    );
  }
}
export default TwoColumsAnswers;
