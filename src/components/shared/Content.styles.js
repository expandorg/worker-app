import { css } from 'glamor';
import { PADDING } from '../common/style-constants';

const styles = {
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
};

export default styles;
