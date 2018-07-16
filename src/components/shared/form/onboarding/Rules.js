import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fieldProps } from '../../propTypes';

import Alignment from '../ui/Alignment';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Title from '../ui/Title';
import Paragraph from '../ui/Paragraph';

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
        <Modal
          onClose={this.handleToggle}
          visible={visible}
          headline={field.headline}
          button={field.close}
        >
          <Alignment padding="small">
            <Title>
              {field.title}
            </Title>
          </Alignment>
          <Alignment padding="small">
            <Paragraph>
              {field.rules}
            </Paragraph>
          </Alignment>
        </Modal>
      </Alignment>
    );
  }
}
