import React from 'react';

import Content from '../shared/Content';
import Panel from '../shared/Panel';

const Disabled = () => (
  <Content title="Browse Jobs">
    <Panel>
      There are currently no available jobs. Please check back soon!
    </Panel>
  </Content>
);

export default Disabled;
