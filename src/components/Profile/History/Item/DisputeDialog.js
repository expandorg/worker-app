import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { RequestStates, SubmitStateEffect } from '@expandorg/app-utils';
import { Dialog, DialogForm as DF, Button, Input } from '@expandorg/components';

import { startDispute } from '../../../../sagas/profileSagas';
import { startDisputeStateSelector } from '../../../../selectors/ui';

import styles from './DisputeDialog.module.styl';

export default function DisputeDialog({ onHide, response }) {
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const changeMessage = useCallback((evt) => setMessage(evt.target.value), []);

  const submitState = useSelector(startDisputeStateSelector);
  const isSubmitting = submitState.state === RequestStates.Fetching;

  const submit = useCallback(() => {
    if (!isSubmitting) {
      dispatch(startDispute(response.id, message));
    }
  }, [dispatch, isSubmitting, message, response.id]);

  const hide = useCallback(() => onHide(), [onHide]);

  return (
    <Dialog visible onHide={onHide} contentLabel="dispute-dialog">
      <DF.Container className={styles.container}>
        <DF.Title>Dispute Rejection</DF.Title>
        <DF.Field>
          <Input
            placeholder="Your message to reviewer"
            value={message}
            onChange={changeMessage}
          />
        </DF.Field>
        <DF.Actions className={styles.actions}>
          <Button onClick={onHide} theme="secondary" size="small">
            Go back
          </Button>
          <Button onClick={submit} disabled={isSubmitting} size="small">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </DF.Actions>
      </DF.Container>
      <SubmitStateEffect submitState={submitState} onComplete={hide} />
    </Dialog>
  );
}

DisputeDialog.propTypes = {
  response: PropTypes.shape({
    id: PropTypes.number,
    task_id: PropTypes.number,
    title: PropTypes.string,
    submitted_at: PropTypes.string,
    accepted: PropTypes.bool,
    gems: PropTypes.number,
    reason: PropTypes.string,
  }).isRequired,
  onHide: PropTypes.func.isRequired,
};
