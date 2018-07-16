import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fieldProps } from '../../propTypes';

import Alignment from '../ui/Alignment';
import Submit from '../ui/Submit';
import Button from '../ui/Button';
import Paragraph from '../ui/Paragraph';
import Answers from '../ui/Answers';
import Answer from '../ui/Answer';

import styles from './QA.module.styl';

export default class QA extends Component {
  static propTypes = {
    field: PropTypes.shape(fieldProps).isRequired,
    value: PropTypes.string,
    isSubmitting: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null,
  }

  state = {
    disabled: true,
  }

  handleChange = (value) => {
    const { field, onChange } = this.props;
    this.setState({ disabled: false });
    onChange(field.name, value);
  }

  render() {
    const {
      field, isSubmitting, onSubmit, value,
    } = this.props;
    const { disabled } = this.state;
    return (
      <Alignment vertical className={styles.container}>

        <Alignment padding="medium" vCenter>
          <Button size="medium">
            Read article
          </Button>
          <p className={styles.p}>
            Read article and answer the questions!
          </p>
        </Alignment>

        <div className={styles.stats}>
          <div className={styles.block}>
            Question<span className={styles.number}>{field.number} / {field.total}</span>
          </div>
          <div className={styles.block}>
            <span className={styles.number}>{field.tries}</span>Tries left
          </div>
        </div>
        <Alignment vertical vCenter padding="medium">
          <div className={styles.block}>
            Question {field.number}:
          </div>
          <Paragraph className={styles.question} fontSize="medium" centered>
            {field.question}
          </Paragraph>
        </Alignment>
        <Alignment padding="medium" vertical>
          <Answers
            answers={field.answers}
            onSelect={this.handleChange}
            value={value}
          >
            {({ key, onSelect, answer, selected }) => (
              <Answer
                key={key}
                selected={selected}
                onSelect={onSelect}
                answer={answer}
              />
            )}
          </Answers>
        </Alignment>
        <Alignment align="between" padding="medium">
          <div className={styles.actions}>
            <Button size="small" theme="link">
              See rules
            </Button>
            <div className={styles.spacer} />
            <Button size="small" theme="link">
              See instructions
            </Button>
          </div>
          <Submit
            caption={field.submit}
            isSubmitting={isSubmitting || disabled}
            theme="aqua"
            size="medium"
            onSubmit={onSubmit}
            disabled={disabled}
          />
        </Alignment>
      </Alignment>
    );
  }
}
