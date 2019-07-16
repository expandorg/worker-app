import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { userSelector } from '@expandorg/app-auth/selectors';

import { RequestStates } from '@expandorg/app-utils';
import SurveyPopup from './SurveyPopup';
import { getProfile } from '../../../sagas/profileSagas';
import { getProfileStateSelector } from '../../../selectors/ui';
import { profileSelector } from '../../../selectors/profileSelectors';

const showProfile = profile => {
  if (!profile) {
    return null;
  }
  return false;
};

export default function Survey() {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const profile = useSelector(profileSelector);

  const fetchState = useSelector(getProfileStateSelector);

  const userId = user ? user.id : null;

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
    }
  }, [dispatch, userId]);

  const fetched = fetchState.state === RequestStates.Fetched;
  if (!user || !fetched || !showProfile(profile)) {
    return null;
  }
  return <SurveyPopup user={user} profile={profile} />;
}
