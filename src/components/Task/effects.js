// @flow

import { submitStateEffect } from '@expandorg/app-utils';

import {
  reportAssignmentStateSelector,
  cancelAssignmentStateSelector,
} from '../../selectors/uiStateSelectors';

export const ReportAssignmentStateEffect = submitStateEffect(
  reportAssignmentStateSelector
);

export const CancelAssignmentStateEffect = submitStateEffect(
  cancelAssignmentStateSelector
);
