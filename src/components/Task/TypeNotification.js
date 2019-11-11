import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNotification } from '@expandorg/app-utils/app';

import { assignmentProps } from '../shared/propTypes';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addNotification }, dispatch);

const isVerification = ({ responseId }) =>
  responseId !== undefined && responseId !== null;

class TypeNotification extends Component {
  static propTypes = {
    assignment: assignmentProps.isRequired,
    addNotification: PropTypes.func.isRequired,
  };

  componentDidUpdate({ assignment: prevAssignment }) {
    const { assignment } = this.props;

    const task = !isVerification(assignment) && isVerification(prevAssignment);
    const verification =
      isVerification(assignment) && !isVerification(prevAssignment);

    if (task || verification) {
      const message = verification
        ? 'This is verification task now'
        : 'This is a regular task now';

      this.props.addNotification('success', message);
    }
  }

  render() {
    return null;
  }
}

export default connect(null, mapDispatchToProps)(TypeNotification);
