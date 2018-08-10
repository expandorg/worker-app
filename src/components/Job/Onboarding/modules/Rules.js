import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Checkbox } from '@gigs/components';
import { Alignment, moduleProps } from '@gigs/components/modules';

import ArticleModal from './ArticleModal';

import styles from './Rules.module.styl';

export default class Rules extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
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
    const { module, value, onChange } = this.props;
    const { visible } = this.state;
    return (
      <Alignment padding="medium">
        <Button
          size="medium"
          theme="blue"
          className={styles.button}
          onClick={this.handleToggle}
        >
          {module.buttonTitle}
        </Button>
        <Checkbox
          name={module.name}
          label={module.checkbox}
          value={value}
          onChange={changed => onChange(module.name, changed)}
        />
        <ArticleModal
          onHide={this.handleToggle}
          visible={visible}
          headline={module.headline}
          title={module.title}
          content={module.rules}
          hideTitle={module.close}
        />
      </Alignment>
    );
  }
}
