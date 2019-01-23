import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dialog, Button } from '@expandorg/components';

import { RequestStates, requestStateProps } from '@expandorg/app-utils';

import { cancelAssignmentStateSelector } from '../../../selectors/uiStateSelectors';
import { cancelAssignment } from '../../../sagas/assignmentsSagas';

import styles from '../../shared/serviceForms.module.styl';

const mapStateToProps = state => ({
  submitState: cancelAssignmentStateSelector(state),
});

const mapDispatchToProps = dispatch =>
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
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.title}>Cancel task</div>
            <div className={styles.description}>
              Are you sure that you want to cancel current task?
            </div>
            <div className={styles.actions}>
              <Button className={styles.button} onClick={this.handleSubmit}>
                Cancel task
              </Button>
              <Button className={styles.button} theme="grey" onClick={onHide}>
                go back
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CancelAssignmentDialog);
