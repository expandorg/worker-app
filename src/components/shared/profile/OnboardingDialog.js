import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dialog, DialogHeadline, Tooltip, Button as Btn } from '@gemsorg/components';

import Profile, { makeProfile } from './form/ProfileForm';

import { TooltipSpan, WhyText } from './tooltips';

import { saveProfile } from '../../../sagas/userSagas';
import { userProps } from '../propTypes';

import styles from './OnboardingDialog.module.styl';

const Button = Tooltip(Btn);

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
              <Button
                theme="white"
                onClick={this.handleSkip}
                className={styles.skip}
                tooltip={<WhyText />}
              >
                Skip
              </Button>
              <Button type="submit" theme="pink" className={styles.submit}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    );
  }
}

export default connect(null, mapDispatchToProps)(OnboardingDialog);
