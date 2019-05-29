import React from 'react';

import { connect } from 'react-redux';

import { userProps } from '@expandorg/app-auth';
import { userSelector } from '@expandorg/app-auth/selectors';

import SurveyPopup from './SurveyPopup';

import { surveyVisible } from '../../../model/survey';

const mapStateToProps = state => ({
  user: userSelector(state),
});

function Survey({ user }) {
  if (!surveyVisible(user)) {
    return null;
  }

  const handleHide = () => {};

  return <SurveyPopup user={user} onHide={handleHide} />;
}

Survey.propTypes = {
  user: userProps,
};

Survey.defaultProps = {
  user: null,
};

export default connect(mapStateToProps)(Survey);
