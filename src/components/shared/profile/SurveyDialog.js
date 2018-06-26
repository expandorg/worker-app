import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog, { DialogHeadline } from '../../common/Dialog';

import Profile, { makeProfile } from './ProfileForm';

import { saveProfile } from '../../../sagas/userSagas';
import { userProps } from '../propTypes';

import styles from './SurveyDialog.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveProfile }, dispatch);

class SurveyDialog extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    saveProfile: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      profile: makeProfile(props.user),
    };
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.onHide();
  }

  handleSkip = (evt) => {
    evt.preventDefault();
    this.props.onHide();
  }

  handleProfileChange = (update) => {
    this.setState(({ profile }) => ({
      profile: { ...profile, ...update },
    }));
  }

  render() {
    const { profile } = this.state;

    return (
      <Dialog contentLabel="survey" visible hideButton>
        <DialogHeadline>
          Tell us about yourself
        </DialogHeadline>
        <div className={styles.container}>
          <form className={styles.content} onSubmit={this.handleSubmit}>
            <Profile
              {...profile}
              onChange={this.handleProfileChange}
            />
            <div className={styles.row}>
              <button onClick={this.handleSkip} className={styles.skip}>
                Skip
              </button>
              <button type="submit" className={styles.submit}>
                Save
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    );
  }
}

export default connect(null, mapDispatchToProps)(SurveyDialog);
