import React from 'react';
import { Tooltip } from '@gemsorg/components';

import styles from './OnboardingDialog.module.styl';

export const TooltipSpan = Tooltip(({ children, ...rest }) =>
  <span {...rest}>{children}</span>,
);


export const WhyText = () => (
  <div className={styles.whyText}>
    <p>Certain tasks have eligibility requirements.</p>
    <p>If you do not fill out the survey you will not be eligible to do those tasks</p>
  </div>
);
