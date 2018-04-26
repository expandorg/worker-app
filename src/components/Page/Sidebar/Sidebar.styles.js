import { css } from 'glamor';
import { SIDEBAR_W, PADDING, BLUE } from '../../common/style-constants';

const styles = {
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
  logo: css({
    marginTop: 10,
    width: 119,
    height: 50,
  }),
};

export default styles;
