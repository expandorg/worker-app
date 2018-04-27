import { css } from 'glamor';
import { SIDEBAR_W } from '../common/style-constants';

const styles = {
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
  sbw: css({
    marginLeft: `${SIDEBAR_W}px`,
  }),
};

export default styles;
