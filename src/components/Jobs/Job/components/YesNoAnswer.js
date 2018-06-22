import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from '../../../Task/form/Field'; // eslint-disable-line

import styles from './YesNo.module.styl';

class YesNoAnswers extends Component {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      labele: PropTypes.string,
      type: PropTypes.string,
    })).isRequired,
    answered: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    styles: PropTypes.string.isRequired,
  };
  state = {
    selected: null,
  }

  selected = (key) => {
    this.setState({ selected: key });
    this.props.answered(key);
  }

  render() {
    const transActive = styles.btnTransActive;
    const trans = styles.btnTrans;
    const { answers } = this.props;
    return (
      <div>
        <p className={styles.phDarkGrey}>{this.props.text}</p>
        <div className={styles.YesNoContainer}>
          {answers.map((answer) => {
            const activeLink = this.state.selected === answer.key ? transActive : trans;
            const type = { type: answer.type };
            return (
              <Field
                className={activeLink}
                columnStyle={this.props.styles}
                field={type}
                value={answer}
                onChange={this.selected}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default YesNoAnswers;
