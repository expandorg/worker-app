// @flow
import { createActionTypes } from '@expandorg/app-utils';

export const GtmActions = {
  ...createActionTypes('Tasks', {
    JobAssign: null,
    TaskSubmit: null,
  }),
};

export const ua = (
  action: string,
  value?: string | number,
  label?: string
) => ({
  action,
  value,
  label,
});
