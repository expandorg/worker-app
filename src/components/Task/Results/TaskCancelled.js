import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Panel } from '@expandorg/components';

import styles from './TaskCancelled.module.styl';

export default class TaskCancelled extends Component {
  render() {
    return (
      <Panel>
        <div className={styles.container}>
          <Link to="/" className={styles.browse}>
            Browse available jobs
          </Link>
        </div>
      </Panel>
    );
  }
}
