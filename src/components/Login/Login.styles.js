import { css } from 'glamor';
import { BTN } from '../common/style-constants';

const styles = {
  btn: BTN,
  container: css({
    position: 'relative',
    display: 'block',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '12.5px',
    paddingBottom: '12.5px',
  }),
  loginContainer: css({
    position: 'relative',
    display: 'block',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '12.5px',
    paddingBottom: '12.5px',
  }),
  startBtn: css({
    width: '174px',
    height: '64px',
    marginTop: '35px',
  }),
  loginBtn: css({
    width: 'calc(174px / 1.5)',
    height: 'calc(64px / 1.5)',
    marginTop: '17.5px',
  }),
  instructions: css({
    fontFamily: 'Poppins',
    fontSize: '10.6px',
    fontWeight: '400',
    textAlign: 'center',
    margin: 'auto',
    display: 'block',
  }),
  screenShot: css({
    paddingBottom: '7.5px',
    paddingTop: '50px',
    width: 'calc(414px / 1.5)',
    height: 'calc(556px / 1.5)',
    margin: 'auto',
    textAlign: 'center',
    display: 'block',
  }),
};

export default styles;
