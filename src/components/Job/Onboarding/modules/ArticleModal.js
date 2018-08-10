import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Article } from '@gemsorg/components/modules';

export default class ArticleModal extends Component {
  static propTypes = {
    headline: PropTypes.string.isRequired,
    hideTitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    content: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  static defaultProps = {
    image: null,
  }

  render() {
    const { visible, onHide, headline, hideTitle, ...rest } = this.props;
    return (
      <Modal
        onHide={onHide}
        visible={visible}
        headline={headline}
        button={hideTitle}
      >
        <Article {...rest} wide />
      </Modal>
    );
  }
}
