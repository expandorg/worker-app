import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fieldProps } from '../../../shared/propTypes';

import Alignment from '../../../shared/form/ui/Alignment';
import Button from '../../../shared/form/ui/Button';
import Checkbox from '../../../shared/form/ui/Checkbox';

import ArticleModal from './ArticleModal';

import styles from './Rules.module.styl';

export default class Rules extends Component {
  static propTypes = {
    field: PropTypes.shape(fieldProps).isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: false,
  }

  state = {
    visible: false,
  }

  handleToggle = () => {
    this.setState(({ visible }) => ({ visible: !visible }));
  }

  render() {
    const { field, value, onChange } = this.props;
    const { visible } = this.state;
    return (
      <Alignment padding="medium">
        <Button
          size="medium"
          theme="blue"
          className={styles.button}
          onClick={this.handleToggle}
        >
          {field.buttonTitle}
        </Button>
        <Checkbox
          name={field.name}
          label={field.checkbox}
          value={value}
          onChange={changed => onChange(changed)}
        />
        <ArticleModal
          onHide={this.handleToggle}
          visible={visible}
          headline={field.headline}
          title={field.title}
          content={field.rules}
          hideTitle={field.close}
        />
      </Alignment>
    );
  }
}
