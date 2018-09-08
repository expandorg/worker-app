import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Alignment } from '@gemsorg/components/modules';

export default class Task extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
  };

  render() {
    const { link } = this.props;
    return (
      <Alignment padding="medium" vCenter>
        <a
          className="gem-button gem-button-medium gem-button-pink"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read article
        </a>
        <p>Read article and answer the questions!</p>
      </Alignment>
    );
  }
}
