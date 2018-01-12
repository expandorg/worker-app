import React, { PureComponent } from 'react';
import MetaMaskStep from '../containers/meta-mask-step';
import IntroductionStep from './introduction-step';

export default class Page extends PureComponent {
  constructor() {
    super();

    this.state = {
      didStart: false,
    };
  }

  render() {
    const { didStart } = this.state;

    if (didStart) {
      return <MetaMaskStep />;
    }

    return (
      <IntroductionStep
        onNextStep={() => this.setState({ didStart: true })}
      />
    );
  }
}
