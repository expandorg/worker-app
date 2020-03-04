import React from 'react';
import PropTypes from 'prop-types';

import { useToggle } from '@expandorg/components';

import DisputeDialog from './DisputeDialog';

import styles from './Rejection.module.styl';

export default function Rejection({ response, dispute }) {
  const [dialog, toggle] = useToggle(false);
  if (response.accepted !== false) {
    return null;
  }

  const isDisputing = !!dispute;

  return (
    <div className={styles.rejection}>
      {response.reason && (
        <div className={styles.block}>
          <div className={styles.from}>rejection reason</div>
          <div className={styles.comment}>{response.reason}</div>
        </div>
      )}
      {isDisputing && dispute.resolution_message && (
        <div className={styles.block}>
          <div className={styles.from}>resolution</div>
          <div className={styles.comment}>{dispute.resolution_message}</div>
        </div>
      )}
      <button className={styles.disput} onClick={toggle} disabled={isDisputing}>
        dispute rejection
      </button>
      {dialog && <DisputeDialog onHide={toggle} response={response} />}
    </div>
  );
}

Rejection.propTypes = {
  response: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    submitted_at: PropTypes.string,
    accepted: PropTypes.bool,
    gems: PropTypes.number,
    reason: PropTypes.string,
  }).isRequired,
  dispute: PropTypes.shape({
    resolution_message: PropTypes.string,
  }),
};
Rejection.defaultProps = {
  dispute: null,
};
