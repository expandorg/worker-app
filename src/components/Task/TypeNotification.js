import { Component } from 'react';

import { assignmentProps } from '../shared/propTypes';

const isVerification = ({ responseId }) =>
  responseId !== undefined && responseId !== null;

export default class TypeNotification extends Component {
  static propTypes = {
    assignment: assignmentProps.isRequired,
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

      console.log(message);
    }
  }

  render() {
    return null;
  }
}
