import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Panel } from '@expandorg/components';

import styles from './Cancelled.module.styl';

export default class Cancelled extends Component {
  render() {
    return (
      <Panel>
        <div className={styles.container}>
          <Link to="/jobs" className={styles.browse}>
            Browse available jobs
          </Link>
        </div>
      </Panel>
    );
  }
}
