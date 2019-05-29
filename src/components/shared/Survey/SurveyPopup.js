import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { userProps } from '@expandorg/app-auth';
import { requestStateProps, RequestStates } from '@expandorg/app-utils';

import Navbar from '../Navbar';
import SurveyWizard from './SurveyWizard';

import { saveProfileStateSelector } from '../../../selectors/uiStateSelectors';
import { saveProfile } from '../../../sagas/userSagas';

import styles from './SurveyPopup.module.styl';

const mapStateToProps = state => ({
  submitState: saveProfileStateSelector(state),
});

class SurveyPopup extends Component {
  static propTypes = {
    user: userProps,
    submitState: requestStateProps.isRequired,
    saveProfile: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  handleSubmit = profile => {
    const { submitState } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      this.props.saveProfile(profile);
    }
  };

  render() {
    const { user, submitState, onHide } = this.props;
    return (
      <div className={styles.container}>
        <Navbar title="Getting Started" theme="dark" top={false}>
          <div className={styles.header}>
            <button onClick={onHide} className={styles.close}>
              ✕
            </button>
          </div>
        </Navbar>
        <div className={styles.content}>
          <SurveyWizard
            user={user}
            submitState={submitState}
            onSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { saveProfile }
)(SurveyPopup);
