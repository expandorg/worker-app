import { Component } from 'react';
import PropTypes from 'prop-types';

import { worker as workerProps, stats as statsProps, routerProps } from './propTypes';
import { isWorkerFunded } from '../../model/worker';

export default class Funded extends Component {
  static propTypes = {
    router: PropTypes.shape(routerProps).isRequired,
    children: PropTypes.element.isRequired,
    worker: PropTypes.shape(workerProps),
    stats: PropTypes.shape(statsProps).isRequired,
  }

  static defaultProps = {
    worker: null,
  }

  componentDidMount() {
    if (!this.isFunded()) {
      this.props.router.replace('/account');
    }
  }

  componentDidUpdate() {
    if (!this.isFunded()) {
      this.props.router.replace('/account');
    }
  }

  isFunded() {
    return isWorkerFunded(this.props.worker, this.props.stats);
  }

  render() {
    return this.isFunded() === true && this.props.children;
  }
}
