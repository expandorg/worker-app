import React from 'react';

import Tooltip from '../../common/Tooltip';

import styles from './OnboardingDialog.module.styl';

export const TooltipSpan = Tooltip(({ children, ...rest }) =>
  <span {...rest}>{children}</span>,
);

export const TooltipButton = Tooltip(({ children, ...rest }) =>
  <button {...rest}>{children}</button>,
);

export const WhyText = () => (
  <div className={styles.whyText}>
    <p>Certain tasks have eligibility requirements.</p>
    <p>If you do not fill out the survey you will not be eligible to do those tasks</p>
  </div>
);
