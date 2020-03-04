import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Footer as UIFooter } from '@expandorg/components/app';

export default class Footer extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        isExternal: PropTypes.bool,
      })
    ),
  };

  static defaultProps = {
    links: [
      {
        link: 'https://expand.org',
        text: 'Expand 2020',
        isExternal: true,
      },
      {
        link: 'https://twitter.com/xpn',
        text: 'Twitter',
        isExternal: true,
      },
      {
        link: 'https://t.me/expandorg',
        text: 'Telegram',
        isExternal: true,
      },
    ],
  };

  render() {
    const { links } = this.props;

    return <UIFooter links={links} />;
  }
}
