import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Header from './Header';
import Sidebar from './Sidebar/SidebarContainer';

import ErrorMessage from '../shared/ErrorMessage';

import styles from './AppPage.module.styl';

export default class AppPage extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  state = {
    sidebar: false,
  }

  handleToggleSidebar = () => {
    this.setState(({ sidebar }) => ({ sidebar: !sidebar }));
  }

  render() {
    const { children } = this.props;
    const { sidebar } = this.state;

    return (
      <div className={styles.app}>
        <Header collapsed={sidebar} onToggle={this.handleToggleSidebar} />
        <Sidebar visible={sidebar} />
        <div className={cn(styles.container, { [styles.sbw]: sidebar })}>
          <ErrorMessage />
          {children}
        </div>
      </div>
    );
  }
}
