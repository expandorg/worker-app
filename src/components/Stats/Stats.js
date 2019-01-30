import React, { Component } from 'react';

import { connect } from 'react-redux';

import { userSelector } from '@expandorg/app-auth/selectors';
import { userProps } from '@expandorg/app-auth';

import { Panel } from '@expandorg/components';

import I from '../shared/I';
import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';
import Hero from '../shared/Hero';

import { authenticated } from '../shared/auth';

import styles from './Stats.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

class Stats extends Component {
  static propTypes = {
    user: userProps.isRequired,
  };

  render() {
    const { user } = this.props;

    return (
      <Page title="Stats">
        <Navbar title="Stats" />
        <Sidebar />
        <div className={styles.container}>
          <Panel className={styles.content}>
            <Hero
              value={user.stats.pending}
              title={
                <div className={styles.pendingTitle}>
                  Pending
                  <I
                    tooltip="Tasks are pending acceptance."
                    tooltipPosition="right"
                    tooltipOrientation="right"
                    className={styles.i}
                  />
                </div>
              }
              className={styles.item}
            />
            <Hero
              value={user.stats.accepted}
              title="Accepted"
              className={styles.item}
            />
            <Hero
              value={user.stats.rejected}
              title="Rejected"
              className={styles.item}
            />
          </Panel>
        </div>
      </Page>
    );
  }
}

export default authenticated(connect(mapStateToProps)(Stats));
