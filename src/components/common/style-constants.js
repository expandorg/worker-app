import { css } from 'glamor';

export const SIDEBAR_W = 250;
export const PADDING = 25;
export const BORDER_R = 4;
export const BLUE = '#1c2541';
export const PINK = '#ff7092';
export const GREEN = '#6fffe9';

export const PANEL = css({
  padding: PADDING,
  borderRadius: BORDER_R,
  backgroundColor: '#ffffff',
  border: 'solid 1px #f2f2f2',
  display: 'block',
  margin: PADDING,
});

export const LOADING = css({
  display: 'block',
  margin: 'auto',
  height: '150px',
  width: '150px',
  background: 'url(/images/loading-animation.gif) no-repeat left top',
  backgroundSize: 'contain',
  position: 'relative',
  top: '35%',
  transform: 'translateY(-50%)',
});

export const FLEX_PANEL = css({
  padding: PADDING,
  borderRadius: BORDER_R,
  backgroundColor: '#ffffff',
  border: 'solid 1px #f2f2f2',
  margin: PADDING,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
});

export const BTN = css({
  width: '132px',
  height: '42px',
  borderRadius: '4px',
  backgroundColor: PINK,
  fontSize: '16px',
  textAlign: 'center',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  border: 0,
  cursor: 'pointer',
  ':focus': {
    outline: '0px',
  },
  ':hover': {
    backgroundImage: 'linear-gradient(to bottom right,#ff7092,#FF8EA9)',
  },
  ':disabled': {
    backgroundColor: '#f2f2f2',
    ':hover': {
      backgroundImage: 'none',
    },
  },
});
