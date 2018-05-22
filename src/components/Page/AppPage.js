import React, { Component } from 'react';

import Header from './Header';
import Sidebar from './Sidebar/Sidebar';

import ErrorMessage from './ErrorMessage';

import styles from './AppPage.module.styl';

export default class AppPage extends Component {
  state = {
    sidebar: false,
  }

  handleToggle = () => {
    this.setState(({ sidebar }) => ({ sidebar: !sidebar }));
  }

  render() {
    const { children } = this.props;
    const { sidebar } = this.state;

    return (
      <div className={styles.container}>
        <Header collapsed={sidebar} onToggle={this.handleToggle} />
        <Sidebar visible={sidebar} />
        <div className={styles.content}>
          <ErrorMessage />
          {children}
        </div>
      </div>
    );
  }
}
