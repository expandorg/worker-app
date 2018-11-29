import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { rules as validationRules } from '@gemsorg/validation';

import { Button } from '@gemsorg/components';
import {
  Alignment,
  Paragraph,
  Select,
  Choice,
  Progress,
} from '@gemsorg/modules';

import Task from './Task';
import ArticleModal from '../ArticleModal';

import styles from './QA.module.styl';

export default class QA extends Component {
  static propTypes = {
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.object).isRequired,
    rulesTitle: PropTypes.string.isRequired,
    rulesContent: PropTypes.string.isRequired,
    instructionsTitle: PropTypes.string.isRequired,
    instructionsContent: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: null,
  };

  static module = {
    type: 'qa',
    report: ['Incorrect question'],
    validation: {
      isNotEmpty: validationRules.isNotEmpty,
      isRequired: validationRules.isRequired,
    },
  };

  state = {
    rules: false,
    instructions: false,
  };

  handleChange = value => {
    const { name, onChange } = this.props;
    onChange(name, value);
  };

  handleToggleRules = () => {
    this.setState(({ rules }) => ({ rules: !rules }));
  };

  handleToggleInstructions = () => {
    this.setState(({ instructions }) => ({ instructions: !instructions }));
  };

  render() {
    const {
      value,
      link,
      number,
      total,
      question,
      answers,
      rulesTitle,
      rulesContent,
      instructionsTitle,
      instructionsContent,
    } = this.props;
    const { rules, instructions } = this.state;
    return (
      <Alignment vertical className={styles.container}>
        <Task link={link} />
        <Progress number={number} total={total} />
        <Alignment vertical vCenter padding="medium">
          <div className={styles.block}>Question {number}:</div>
          <Paragraph
            className={styles.question}
            fontSize="medium"
            centered
            content={question}
          />
        </Alignment>
        <Alignment padding="medium" vertical>
          <Select options={answers} onSelect={this.handleChange} value={value}>
            {({ onSelect, option }) => (
              <Choice
                key={option.value}
                className={styles.choice}
                selected={value === option.value}
                onSelect={onSelect}
                option={option}
              />
            )}
          </Select>
        </Alignment>
        <Alignment justify="between" padding="medium">
          <div className={styles.actions}>
            <Button size="small" theme="link" onClick={this.handleToggleRules}>
              See rules
            </Button>
            <div className={styles.spacer} />
            <Button
              size="small"
              theme="link"
              onClick={this.handleToggleInstructions}
            >
              See instructions
            </Button>
          </div>
          <div />
        </Alignment>
        <ArticleModal
          visible={rules}
          onHide={this.handleToggleRules}
          headline="Rules"
          hideTitle="Close"
          title={rulesTitle}
          content={rulesContent}
        />
        <ArticleModal
          visible={instructions}
          onHide={this.handleToggleInstructions}
          headline="Instructions"
          hideTitle="Close"
          title={instructionsTitle}
          content={instructionsContent}
        />
      </Alignment>
    );
  }
}
