import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@gigs/components';
import { Alignment, Paragraph, Select, Choice, fieldProps } from '@gigs/components/fields';

import Progress from './Progress';
import Task from './Task';
import ArticleModal from '../ArticleModal';

import styles from './QA.module.styl';

export default class QA extends Component {
  static propTypes = {
    field: fieldProps.isRequired,
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
    const { field, onChange } = this.props;
    this.setState({ disabled: false });
    onChange(field.name, value);
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
      field, isSubmitting, value, contextData,
    } = this.props;
    const { disabled, rules, instructions } = this.state;
    const triesLeft = (+contextData.allowedTries || 0) - (+contextData.currentTry || 0);
    return (
      <Alignment vertical className={styles.container}>
        <Task link={field.link} />
        <Progress number={field.number} total={field.total} triesLeft={triesLeft} />
        <Alignment vertical vCenter padding="medium">
          <div className={styles.block}>
            Question {field.number}:
          </div>
          <Paragraph
            className={styles.question}
            fontSize="medium"
            centered
            content={field.question}
          />
        </Alignment>
        <Alignment padding="medium" vertical>
          <Select options={field.answers} onSelect={this.handleChange} value={value} >
            {({ key, onSelect, option, selected }) => (
              <Choice
                key={key}
                className={styles.choice}
                selected={selected}
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
            {field.submit && (
              <Button
                onClick={this.handleSubmit}
                size="large"
                theme="aqua"
                disabled={isSubmitting || disabled}
              >
                {field.submit}
              </Button>
            )}
          </div>
        </Alignment>
        <ArticleModal
          visible={rules}
          onHide={this.handleToggleRules}
          headline="Rules"
          hideTitle="Close"
          title={field.rulesTitle}
          content={field.rulesContent}
        />
        <ArticleModal
          visible={instructions}
          onHide={this.handleToggleInstructions}
          headline="Instructions"
          hideTitle="Close"
          title={field.instructionsTitle}
          content={field.instructionsContent}
        />
      </Alignment>
    );
  }
}
