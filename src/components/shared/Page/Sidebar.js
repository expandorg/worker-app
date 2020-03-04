import React from 'react';
import PropTypes from 'prop-types';

import { Sidebar as UISidebar, SidebarLink } from '@expandorg/components/app';

import { ReactComponent as JobsIcon } from '@expandorg/uikit/assets/jobs.svg';
import { ReactComponent as ProfileIcon } from '../../assets/person.svg';
import { ReactComponent as AccountIcon } from '../../assets/settings.svg';

export default function Sidebar({ navigation }) {
  return (
    <UISidebar>
      {navigation.map(item => (
        <SidebarLink key={item.link} item={item} />
      ))}
    </UISidebar>
  );
}

Sidebar.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
    })
  ),
};

Sidebar.defaultProps = {
  navigation: [
    {
      link: '/',
      title: 'Jobs',
      icon: JobsIcon,
    },
    {
      link: '/profile',
      title: 'Profile',
      icon: ProfileIcon,
    },
    {
      link: '/account',
      title: 'Account',
      icon: AccountIcon,
    },
  ],
};
