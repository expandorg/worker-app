import { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';

// TODO: fetch auth even when outside of private routes to render sidebar correctly
class Private extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
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
    return this.props.location.pathname === '/task' && this.props.previousJobId === null;
  }

  checkAuth() {
    switch (this.props.isAuthorized) {
      case true:
        if (this.isEmptyTask()) {
          this.props.replace('/jobs');
        }
        break;
      case false:
        this.props.replace('/login');
        break;
      default:
    }
  }

  render() {
    return this.isAuthorized() === true && this.props.children;
  }
}

Private.defaultProps = {
  isAuthorized: null,
  previousJobId: null,
};

Private.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthorized: PropTypes.bool,
  previousJobId: PropTypes.string,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
  replace: PropTypes.func.isRequired,
};

export default Private;
