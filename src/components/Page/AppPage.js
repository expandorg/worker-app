import React, { Component } from 'react';

import TrackVisit from '../common/gtm/TrackVisit';
import GtmProvider from '../common/gtm/GtmProvider';

import Header from './Header';
import Sidebar from './Sidebar/Sidebar';

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
      <GtmProvider>
        <div className={styles.container}>
          <Header collapsed={sidebar} onToggle={this.handleToggle} />
          <Sidebar visible={sidebar} />
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <TrackVisit />
      </GtmProvider>
    );
  }
}
