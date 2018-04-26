import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { worker as workerProps, stats as statsProps, routerProps } from './propTypes';
import { isWorkerFunded } from '../../lib';

// TODO: fetch auth even when outside of private routes to render sidebar correctly
export default class Private extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthorized: PropTypes.bool,
    isJoined: PropTypes.bool.isRequired,
    location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
    router: PropTypes.shape(routerProps).isRequired,
    worker: PropTypes.shape(workerProps),
    stats: PropTypes.shape(statsProps).isRequired,
  }

  static defaultProps = {
    isAuthorized: null,
    worker: null,
  }

  componentDidMount() {
    this.checkAuth();
  }

  componentDidUpdate() {
    this.checkAuth();
  }

  isAuthorized() {
    return this.props.isAuthorized === true && !this.isEmptyTask();
  }

  isEmptyTask() {
    return this.props.location.pathname === '/task'
      && !this.props.isJoined
      && isWorkerFunded(this.props.worker, this.props.stats);
  }

  checkAuth() {
    switch (this.props.isAuthorized) {
      case true:
        if (this.isEmptyTask()) {
          this.props.router.replace('/jobs');
        }
        break;
      case false:
        this.props.router.replace('/login');
        break;
      default:
    }
  }

  render() {
    return this.isAuthorized() === true && this.props.children;
  }
}
