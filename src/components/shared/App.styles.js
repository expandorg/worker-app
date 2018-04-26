import { css } from 'glamor';
import { SIDEBAR_W, PADDING, BLUE } from '../../style-constants';

const styles = {
  app: css({
    height: '100%',
    width: '100%',
    fontFamily: 'Poppins',
    color: BLUE,
  }),
  sideBar: css({
    width: SIDEBAR_W - PADDING,
    paddingLeft: PADDING,
    height: '100%',
    display: 'inline-block',
    background: BLUE,
    '@media(max-width: 1150px)': {
      display: 'none',
      '> img': {
        display: 'none',
      },
    },
  }),
  ib: css({
    display: 'inline-block',
    background: '#0B132B',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  }),
  mobileHeader: css({
    display: 'none',
    width: '100%',
    height: '68px',
    backgroundColor: '#1c2541',
    '@media(max-width: 1150px)': {
      display: 'block',
      zIndex: 3,
    },
  }),
  logo: css({
    marginTop: 10,
    width: 119,
    height: 50,
  }),
  mobileLogoContainer: css({
    display: 'inline-block',
    width: 'calc(95% - 99px)',
    verticalAlign: 'middle',
  }),
  mobileLogo: css({
    height: 30,
    width: 30,
    textAlign: 'center',
    margin: 'auto',
    display: 'block',
  }),
  container: css({
    width: `calc(100% - ${SIDEBAR_W}px)`,
    height: '100%',
    backgroundColor: '#f2f2f2',
    display: 'inline-block',
    verticalAlign: 'top',
    '@media(max-width: 1150px)': {
      width: '100%',
    },
  }),
  sbw: css({
    marginLeft: `${SIDEBAR_W}px`,
  }),
  title: css({
    backgroundColor: '#ffffff',
    height: 70,
    boxShadow: 'inset 0 -1px 0 0 #f2f2f2',
  }),
  titleText: css({
    fontSize: 24,
    marginLeft: PADDING * 2,
    lineHeight: '70px',
    '@media(max-width: 1150px)': {
      marginLeft: '25px',
    },
  }),
  error: css({
    height: '40px',
    fontSize: 24,
    textAlign: 'center',
    verticalAlign: 'middle',
    backgroundColor: '#6fffe9',
  }),
  closeBtn: css({
    float: 'right',
    fontSize: '16px',
    display: 'inline-block',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 0,
    height: '40px',
    marginRight: '25px',
    ':focus': {
      outline: '0px',
    },
  }),
  alphaMsg: css({
    display: 'block',
    position: 'relative',
    top: '-25px',
    bottom: '0',
    backgroundColor: '#1c2541',
    color: '#ffffff',
    width: 'calc(100% - 50px)',
    paddingLeft: '25px',
    paddingRight: '25px',
    marginLeft: SIDEBAR_W,
    '@media(max-width: 1150px)': {
      marginLeft: 0,
    },
  }),
  feedback: css({
    marginLeft: '15px',
    color: '#6fffe9',
  }),
};

export default styles;
