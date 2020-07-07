import React from 'react';
import PropTypes from 'prop-types';

import { Button, useToggle } from '@expandorg/components';
import { ReportToggle, formProps } from '@expandorg/modules';
import { moduleControls } from '@expandorg/modules/app';

import AssignmentReport from './AssignmentReport';
import CancelAssignmentDialog from './CancelAssignmentDialog';

import styles from './Actions.module.styl';

export default function Actions({ reportMessage, form, assignmentId }) {
  const [cancel, tooggle] = useToggle(false);

  return (
    <div className={styles.actions}>
      <ReportToggle form={form} controls={moduleControls}>
        {({ onHide, reasons }) => (
          <AssignmentReport
            assignmentId={assignmentId}
            reasons={reasons}
            report={reportMessage}
            onHide={onHide}
          />
        )}
      </ReportToggle>
      <Button onClick={tooggle} theme="link" className={styles.cancel}>
        cancel
      </Button>
      {cancel && (
        <CancelAssignmentDialog assignmentId={assignmentId} onHide={tooggle} />
      )}
    </div>
  );
}

Actions.propTypes = {
  assignmentId: PropTypes.number.isRequired,
  form: formProps.isRequired,
  reportMessage: PropTypes.string,
};

Actions.defaultProps = {
  reportMessage: null,
};
