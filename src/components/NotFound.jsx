import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { task as taskPropTypes } from '../schemas';
import { PANEL } from '../style-constants';

const styles = {
  container: PANEL,
};

class NotFound extends PureComponent {
  componentWillMount() {
    this.props.setTitle('Page Not Found');
  }

  renderLink() {
    if (!this.props.isAuthorized) {
      return <Link to="/login">Log in to get started</Link>;
    }
    if (this.props.task !== null) {
      return <Link to="/task">Go to assigned task</Link>;
    }
    return <Link to="/jobs">Browse available jobs</Link>;
  }

  render() {
    return <div className={styles.container}>{this.renderLink()}</div>;
  }
}

NotFound.defaultProps = {
  task: null,
};

NotFound.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  setTitle: PropTypes.func.isRequired,
  task: PropTypes.shape(taskPropTypes),
};

export default NotFound;
