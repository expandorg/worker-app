import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import ResponsePreview from './ResponsePreview';

import { fetchTaskHistoryEntity } from '../../../../sagas/profileSagas';
import {
  makeTaskHistoryItemSelector,
  makeDisputeSelector,
} from '../../../../selectors/profileSelectors';

import Rejection from './Rejection';

import styles from './Details.module.styl';

export default function Details({ response, services }) {
  const dispatch = useDispatch();

  const itemSelector = useMemo(makeTaskHistoryItemSelector, []);
  const details = useSelector((s) => itemSelector(s, response.id));
  const fetched = !!details;

  const disputeSelector = useMemo(makeDisputeSelector, []);
  const dispute = useSelector((s) => disputeSelector(s, response.id));

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchTaskHistoryEntity(response.id));
    }
  }, [dispatch, fetched, response.id]);

  if (!fetched) {
    return null;
  }

  return (
    <div className={styles.container}>
      <ResponsePreview
        form={details.task_form}
        data={details.task_data}
        response={details.response}
        services={services}
      />
      <div className={styles.actions}>
        <Rejection response={response} dispute={dispute} />
      </div>
    </div>
  );
}

Details.propTypes = {
  response: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    submitted_at: PropTypes.string,
    accepted: PropTypes.bool,
    gems: PropTypes.number,
    reason: PropTypes.string,
  }).isRequired,
  services: PropTypes.shape({}).isRequired,
};
