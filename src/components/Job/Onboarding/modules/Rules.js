import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { rules as validationRules } from '@gemsorg/validation';

import { Button, Checkbox } from '@gemsorg/components';
import { Alignment } from '@gemsorg/modules';

import ArticleModal from './ArticleModal';

import styles from './Rules.module.styl';

export default class Rules extends Component {
  static propTypes = {
    value: PropTypes.bool,
    name: PropTypes.string.isRequired,
    buttonTitle: PropTypes.string.isRequired,
    checkbox: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rules: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: false,
  };

  static module = {
    type: 'rules',
    validation: {
      isTrue: validationRules.isTrue,
      isRequired: validationRules.isTrue,
    },
  };

  state = {
    visible: false,
  };

  handleToggle = () => {
    this.setState(({ visible }) => ({ visible: !visible }));
  };

  render() {
    const {
      value,
      onChange,
      buttonTitle,
      name,
      checkbox,
      headline,
      title,
      rules,
      close,
    } = this.props;
    const { visible } = this.state;
    return (
      <Alignment padding="medium">
        <Button
          size="medium"
          theme="blue"
          className={styles.button}
          onClick={this.handleToggle}
        >
          {buttonTitle}
        </Button>
        <Checkbox
          name={name}
          label={checkbox}
          value={value}
          onChange={changed => onChange(name, changed)}
        />
        <ArticleModal
          onHide={this.handleToggle}
          visible={visible}
          headline={headline}
          title={title}
          content={rules}
          hideTitle={close}
        />
      </Alignment>
    );
  }
}
