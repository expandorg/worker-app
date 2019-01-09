import React from 'react';

import { Panel } from '@gemsorg/components';

import Content from '../shared/Content';

import { authenticated } from '../hoc/authRules';

import styles from './Requester.module.styl';

const Requester = () => (
  <Content title="Post a job to Expand">
    <Panel className={styles.container}>
      <span>Have an organization or company that can use Expand?</span>
      <a
        className={styles.formLink}
        href="https://gemscommunity.typeform.com/to/YRcICm"
        target="_blank"
        rel="noopener noreferrer"
      >
        Please submit this form
      </a>
    </Panel>
  </Content>
);

export default authenticated(Requester);
