import { css } from 'glamor';
import { PADDING } from '../common/style-constants';

const styles = {
  container: css({
    textAlign: 'center',
    display: 'block',
  }),
  description: css({
    margin: '3%',
    display: 'block',
  }),
  screenShot: css({
    paddingBottom: '7.5px',
    maxWidth: '80%',
    width: 'calc(100% - 50px)',
    marginBottom: PADDING * 1.5,
    margin: 'auto',
    textAlign: 'center',
    display: 'block',
  }),
};
export default styles;
