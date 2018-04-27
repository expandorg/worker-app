import { css } from 'glamor';
import { BORDER_R, PADDING } from '../common/style-constants';

const styles = {
  container: css({
    textAlign: 'center',
    display: 'block',
  }),
  description: css({
    margin: '5%',
    display: 'block',
  }),
  input: css({
    width: 'calc(100% - 200px)',
    minWidth: '200px',
    height: '50px',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    border: 'solid 1px #e0e0e0',
    display: 'inline-block',
    fontSize: '16px',
    textAlign: 'left',
    paddingLeft: '15px',
    color: '#b8b8b8',
    '::placeholder': {
      fontSize: '16px',
      textAlign: 'left',
      color: '#b8b8b8',
    },
    ':focus': {
      outline: '0',
    },
  }),
  submitForm: css({
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    marginBottom: PADDING,
    width: '80%',
  }),
  submit: css({
    width: '119px',
    height: '50px',
    borderRadius: BORDER_R,
    backgroundColor: '#ff7092',
    display: 'inline-block',
    fontSize: '18px',
    letterSpacing: '-0.7px',
    textAlign: 'center',
    color: '#ffffff',
    marginLeft: '8px',
    border: '0',
    cursor: 'pointer',
    ':focus': {
      outline: '0',
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
  }),
  resend: css({
    marginLeft: '5px',
  }),
};
export default styles;
