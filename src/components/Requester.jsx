import React from 'react';
import { css } from 'glamor';
import { FLEX_PANEL } from './common/style-constants';

import Content from './shared/Content';

const styles = {
  container: FLEX_PANEL,
  formLink: css({
    width: '100%',
    textAlign: 'center',
    margin: '25px',
  }),
};

const Requester = () => (
  <Content title="Post a job to Gems">
    <div className={styles.container}>
      <span>Have an organization or company that can use Gems?</span>
      <a
        className={styles.formLink}
        href="https://gemscommunity.typeform.com/to/YRcICm"
        target="_blank"
        rel="noopener noreferrer"
      >
        Please submit this form
      </a>
    </div>
  </Content>
);

export default Requester;
