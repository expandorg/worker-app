import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog, { DialogHeadline } from '../../common/Dialog';

import Profile, { makeProfile } from './form/ProfileForm';
import { TooltipSpan, TooltipButton, WhyText } from './tooltips';

import { saveProfile } from '../../../sagas/userSagas';
import { userProps } from '../propTypes';

import styles from './OnboardingDialog.module.styl';


const mapDispatchToProps = dispatch =>
  bindActionCreators({ saveProfile }, dispatch);

class OnboardingDialog extends Component {
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
          Fill out your profile
          <TooltipSpan
            className={styles.why}
            tooltip={<WhyText />}
            tooltipOrientation="bottom"
          >
            why?
          </TooltipSpan>
        </DialogHeadline>
        <div className={styles.container}>
          <form className={styles.content} onSubmit={this.handleSubmit}>
            <Profile
              {...profile}
              onChange={this.handleProfileChange}
            />
            <div className={styles.row}>
              <TooltipButton
                onClick={this.handleSkip}
                className={styles.skip}
                tooltip={<WhyText />}
              >
                Skip
              </TooltipButton>
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

export default connect(null, mapDispatchToProps)(OnboardingDialog);
