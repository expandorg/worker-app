import { css } from 'glamor';

export const SIDEBAR_W = 250;
export const PADDING = 25;
export const BORDER_R = 4;
export const BLUE = '#1c2541';

export const PANEL = css({
  padding: PADDING,
  borderRadius: BORDER_R,
  backgroundColor: '#ffffff',
  border: 'solid 1px #f2f2f2',
  display: 'block',
  margin: PADDING,
});

export const FLEX_PANEL = css({
  padding: PADDING,
  borderRadius: BORDER_R,
  backgroundColor: '#ffffff',
  border: 'solid 1px #f2f2f2',
  margin: PADDING,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const BTN = css({
  width: '132px',
  height: '42px',
  borderRadius: '4px',
  backgroundColor: '#ff7092',
  fontSize: '11px',
  textAlign: 'center',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  cursor: 'pointer',
  ':focus': {
    outline: '0px',
  },
});
