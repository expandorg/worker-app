import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { saveProfileStateSelector } from '../../../selectors/ui';
import { profileFiltersSelector } from '../../../selectors/profileSelectors';
import { saveProfile, getAllFilters } from '../../../sagas/profileSagas';

import SurveyWizard from './SurveyWizard';

export default function SurveyPopup({ profile, userId, onHide, title }) {
  const dispatch = useDispatch();

  const filters = useSelector(profileFiltersSelector);
  const saveState = useSelector(saveProfileStateSelector);

  useEffect(() => {
    dispatch(getAllFilters());
  }, [dispatch]);

  const save = useCallback(
    data => {
      dispatch(saveProfile(data));
    },
    [dispatch]
  );

  return (
    <SurveyWizard
      userId={userId}
      title={title}
      profile={profile}
      filters={filters}
      saveState={saveState}
      onSave={save}
      onHide={onHide}
    />
  );
}

SurveyPopup.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  title: PropTypes.string,
  userId: PropTypes.number.isRequired,
  onHide: PropTypes.func.isRequired,
};

SurveyPopup.defaultProps = {
  title: 'Getting Started',
};
