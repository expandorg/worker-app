import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Sidebar as UISidebar, SidebarLink } from '@expandorg/components/app';

import { ReactComponent as JobsIcon } from '@expandorg/uikit/assets/jobs.svg';
import { ReactComponent as AccountIcon } from '@expandorg/uikit/assets/profile.svg';
import { ReactComponent as StatsIcon } from '@expandorg/uikit/assets/stats.svg';

export default class Sidebar extends Component {
  static propTypes = {
    navigation: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.func.isRequired,
      })
    ),
  };

  static defaultProps = {
    navigation: [
      {
        link: '/',
        title: 'Jobs',
        icon: JobsIcon,
      },
      {
        link: '/stats',
        title: 'Stats',
        icon: StatsIcon,
      },
      {
        link: '/account',
        title: 'Account',
        icon: AccountIcon,
      },
    ],
  };

  render() {
    const { navigation } = this.props;

    return (
      <UISidebar>
        {navigation.map(item => (
          <SidebarLink key={item.link} item={item} />
        ))}
      </UISidebar>
    );
  }
}
