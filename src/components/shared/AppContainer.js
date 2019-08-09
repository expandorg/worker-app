import React, { Component } from 'react';

import { JsScript } from '@expandorg/components';

import settings from '../../common/settings';

export default class AppContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <>
        {children}
        <JsScript
          src={`https://www.googletagmanager.com/gtm.js?id=${settings.gtmTrackingId}`}
          disable={!settings.gtmTrackingId}
        />
      </>
    );
  }
}
