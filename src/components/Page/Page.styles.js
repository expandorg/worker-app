import { css } from 'glamor';
import { SIDEBAR_W, BLUE } from '../common/style-constants';

const styles = {
  app: css({
    height: '100%',
    width: '100%',
    fontFamily: 'Poppins',
    color: BLUE,
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
