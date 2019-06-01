import React, { useCallback } from 'react';

import { connect } from 'react-redux';
import { userProps } from '@expandorg/app-auth';
import { userSelector } from '@expandorg/app-auth/selectors';

import SurveyPopup from './SurveyPopup';

import { surveyVisible } from '../../../model/survey';
import useLocalStorage from '../../common/useLocalStorage';

const mapStateToProps = state => ({
  user: userSelector(state),
});

function Survey({ user }) {
  const [skipped, setSkipped] = useLocalStorage('expand-surey', false);
  const handleHide = useCallback(() => setSkipped(true), [skipped]);
  if (skipped || !surveyVisible(user)) {
    return null;
  }
  return <SurveyPopup user={user} onHide={handleHide} />;
}

Survey.propTypes = {
  user: userProps,
};

Survey.defaultProps = {
  user: null,
};

export default connect(mapStateToProps)(Survey);
