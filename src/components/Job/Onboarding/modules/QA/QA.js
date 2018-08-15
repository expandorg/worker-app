import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@gemsorg/components';
import { Alignment, Paragraph, Select, Choice, moduleProps } from '@gemsorg/components/modules';

import Progress from './Progress';
import Task from './Task';
import ArticleModal from '../ArticleModal';

import styles from './QA.module.styl';

export default class QA extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    contextData: PropTypes.object.isRequired, // eslint-disable-line
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
    rules: false,
    instructions: false,
  }

  handleChange = (value) => {
    const { module, onChange } = this.props;
    this.setState({ disabled: false });
    onChange(module.name, value);
  }

  handleToggleRules = () => {
    this.setState(({ rules }) => ({ rules: !rules }));
  }

  handleToggleInstructions = () => {
    this.setState(({ instructions }) => ({ instructions: !instructions }));
  }

  handleSubmit = (evt) => {
    const { isSubmitting, value, onSubmit } = this.props;
    if (value && !isSubmitting) {
      onSubmit(evt);
    }
  }

  render() {
    const {
      module, isSubmitting, value, contextData,
    } = this.props;
    const { disabled, rules, instructions } = this.state;
    const triesLeft = (+contextData.allowedTries || 0) - (+contextData.currentTry || 0);
    return (
      <Alignment vertical className={styles.container}>
        <Task link={module.link} />
        <Progress number={module.number} total={module.total} triesLeft={triesLeft} />
        <Alignment vertical vCenter padding="medium">
          <div className={styles.block}>
            Question {module.number}:
          </div>
          <Paragraph
            className={styles.question}
            fontSize="medium"
            centered
            content={module.question}
          />
        </Alignment>
        <Alignment padding="medium" vertical>
          <Select options={module.answers} onSelect={this.handleChange} value={value} >
            {({ id, onSelect, option }) => (
              <Choice
                key={id}
                className={styles.choice}
                selected={value === id}
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
            <Button size="small" theme="link" onClick={this.handleToggleInstructions}>
              See instructions
            </Button>
          </div>
          <div>
            {module.submit && (
              <Button
                onClick={this.handleSubmit}
                size="large"
                theme="aqua"
                disabled={isSubmitting || disabled}
              >
                {module.submit}
              </Button>
            )}
          </div>
        </Alignment>
        <ArticleModal
          visible={rules}
          onHide={this.handleToggleRules}
          headline="Rules"
          hideTitle="Close"
          title={module.rulesTitle}
          content={module.rulesContent}
        />
        <ArticleModal
          visible={instructions}
          onHide={this.handleToggleInstructions}
          headline="Instructions"
          hideTitle="Close"
          title={module.instructionsTitle}
          content={module.instructionsContent}
        />
      </Alignment>
    );
  }
}
