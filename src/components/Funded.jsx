import { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { worker as workerProps, stats as statsProps } from '../schemas';
import { isWorkerFunded } from '../lib';

class Funded extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    if (!this.isFunded()) {
      this.props.replace('/account');
    }
  }

  componentDidUpdate() {
    if (!this.isFunded()) {
      this.props.replace('/account');
    }
  }

  isFunded() {
    return isWorkerFunded(this.props.worker, this.props.stats);
  }

  render() {
    return this.isFunded() === true && this.props.children;
  }
}

Funded.defaultProps = {
  worker: null,
};

Funded.propTypes = {
  replace: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  worker: PropTypes.shape(workerProps),
  stats: PropTypes.shape(statsProps).isRequired,
};

export default Funded;
