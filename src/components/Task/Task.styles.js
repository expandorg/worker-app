import { css } from 'glamor';
import { FLEX_PANEL, BORDER_R, PADDING } from '../common/style-constants';

const styles = {
  container: FLEX_PANEL,
  task: css({
    fontSize: '22px',
    textAlign: 'center',
    color: '#3a506b',
    margin: PADDING,
    display: 'block',
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
    display: 'block',
    fontSize: '18px',
    letterSpacing: '-0.7px',
    textAlign: 'center',
    color: '#ffffff',
    margin: '0 auto',
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
  heading: css({
    fontSize: '20px',
    letterSpacing: '-0.3px',
    textAlign: 'center',
    color: '#3a506b',
    display: 'block',
    marginBottom: PADDING / 2,
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
    marginBottom: '15px',
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
  btn: css({
    width: 205,
    height: 50,
    lineHeight: '50px',
    borderRadius: BORDER_R,
    backgroundColor: '#6fffe9',
    display: 'block',
    margin: 'auto',
    marginBottom: PADDING,
    fontSize: '18px',
    letterSpacing: '-0.7px',
    textAlign: 'center',
    border: 0,
    cursor: 'pointer',
    textDecoration: 'none',
    ':focus': {
      outline: 0,
    },
    ':hover': {
      backgroundImage: 'linear-gradient(to bottom right,#6fffe9,#94FFEF)',
    },
  }),
  completed: css({
    width: '30%',
    display: 'inline-block',
    border: 'solid 1px #f2f2f2',
    borderRadius: '4px',
    fontSize: '40px',
    color: '#ff7092',
    textAlign: 'center',
    paddingTop: '46px',
    paddingBottom: '46px',
    marginBottom: '25px',
    '> span': {
      fontSize: '16px',
      color: '#3a506b',
      display: 'block',
    },
  }),
};

export default styles;
