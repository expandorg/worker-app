import { css } from 'glamor';
import { PANEL } from '../common/style-constants';

const styles = {
  innerContainer: PANEL,
  disclaimer: css({
    margin: '25px',
    fontSize: '12px',
    bottom: '0',
    position: 'fixed',
    '@media(max-height: 400px)': {
      position: 'relative',
    },
    '@media(max-width: 430px)': {
      position: 'relative',
    },
  }),
};

export default styles;
