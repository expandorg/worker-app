import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dialog, Button, DialogForm as DF } from '@expandorg/components';

import { RequestStates, requestStateProps } from '@expandorg/app-utils';

import { cancelAssignmentStateSelector } from '../../../selectors/ui';
import { cancelAssignment } from '../../../sagas/assignmentsSagas';

const mapStateToProps = (state) => ({
  submitState: cancelAssignmentStateSelector(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ cancelAssignment }, dispatch);

class CancelAssignmentDialog extends Component {
  static propTypes = {
    assignmentId: PropTypes.number.isRequired,
    submitState: requestStateProps.isRequired,

    cancelAssignment: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  handleSubmit = () => {
    const { assignmentId, submitState } = this.props;

    if (submitState.state !== RequestStates.Fetching) {
      this.props.cancelAssignment(assignmentId);
    }
  };

  render() {
    const { onHide } = this.props;

    return (
      <Dialog visible onHide={onHide} contentLabel="submit task">
        <DF.Container>
          <DF.Title>Cancel task</DF.Title>
          <DF.Description>
            Are you sure that you want to cancel current task?
          </DF.Description>
          <DF.Actions>
            <Button
              className="gem-dialogform-button"
              onClick={this.handleSubmit}
            >
              Cancel task
            </Button>
            <Button
              className="gem-dialogform-button"
              theme="grey"
              onClick={onHide}
            >
              go back
            </Button>
          </DF.Actions>
        </DF.Container>
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelAssignmentDialog);
