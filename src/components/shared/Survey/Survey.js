import React, { useEffect, useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { userSelector } from '@expandorg/app-auth/selectors';
import { useSubmitEffect, RequestStates } from '@expandorg/app-utils';

import SurveyPopup from './SurveyPopup';
import { getProfile } from '../../../sagas/profileSagas';
import { getProfileStateSelector } from '../../../selectors/ui';
import { profileSelector } from '../../../selectors/profileSelectors';

import { showProfile } from './profile';

export default function Survey() {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const profile = useSelector(profileSelector);
  const fetchState = useSelector(getProfileStateSelector);

  const [visible, setVisible] = useState(false);

  const userId = user ? user.id : null;
  const isFetched = fetchState.state === RequestStates.Fetched;

  useEffect(() => {
    if (!isFetched && userId !== null) {
      dispatch(getProfile());
    }
  }, [dispatch, userId, isFetched]);

  const fetched = useCallback(() => {
    if (showProfile(profile)) {
      setVisible(true);
    }
  }, [profile]);

  useSubmitEffect(fetchState, fetched);

  const hide = useCallback(() => setVisible(false), []);

  if (!visible) {
    return null;
  }
  return <SurveyPopup profile={profile} userId={userId} onHide={hide} />;
}
