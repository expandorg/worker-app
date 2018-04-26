import { css } from 'glamor';
import { BTN } from '../common/style-constants';

const styles = {
  container: css({
    textAlign: 'center',
    display: 'block',
  }),
  description: css({
    margin: '5%',
    display: 'block',
  }),
  video: css({
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%',
    width: '100%',
  }),
  videoInnerWrapper: css({
    position: 'relative',
    paddingBottom: '56.2%',
    width: '100%',
    height: '100%',
  }),
  videoWrapper: css({
    width: '100%',
    height: '100%',
    maxHeight: '288px',
    maxWidth: '525px',
    margin: 'auto',
  }),
  btn: BTN,
  installBtn: css({
    marginTop: '16px',
  }),
};

export default styles;
