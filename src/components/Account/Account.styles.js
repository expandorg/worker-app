import { css } from 'glamor';
import { FLEX_PANEL, BORDER_R, PADDING, BTN, LOADING } from '../common/style-constants';

const styles = {
  innerContainer: FLEX_PANEL,
  btn: BTN,
  table: css({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'column',
    margin: '0 0 3em 0',
    padding: '0',
  }),
  cell: css({
    boxSizing: 'border-box',
    flexGrow: '0 1 auto',
    flexDirection: 'column',
    width: '100%',
    padding: '0.8em 1.2em',
    overflow: 'hidden',
    listStyle: 'none',
  }),
  heading: css({
    fontSize: 16,
    letterSpacing: 0.5,
    opacity: '0.4',
    color: '#0b132b',
    display: 'block',
    textTransform: 'uppercase',
    marginBottom: PADDING / 2,
    marginTop: PADDING / 2,
  }),
  subHeading: css({
    fontSize: 16,
    color: '#3a506b',
    display: 'inline-block',
    marginRight: PADDING / 2,
    marginLeft: 20,
  }),
  gem: css({
    width: '20px',
    height: '20px',
    marginLeft: '10px',
  }),
  accountInputContainer: css({
    display: 'inline-block',
    width: 'calc(100% - 62px)',
    verticalAlign: 'middle',
  }),
  accountInput: css({
    borderRadius: BORDER_R,
    border: 'solid 1px #e0e0e0',
    display: 'inline-block',
    fontSize: 14,
    textAlign: 'left',
    color: '#3a506b',
    padding: '8px 12px',
    width: 'calc(100% - 205px)',
    minWidth: '200px',
    ':focus': {
      outline: 0,
    },
  }),
  emailInput: css({
    borderRadius: BORDER_R,
    border: 'solid 1px #e0e0e0',
    display: 'inline-block',
    fontSize: 14,
    textAlign: 'left',
    color: '#3a506b',
    padding: '8px 12px',
    width: 'calc(100% - 394px)',
    minWidth: '200px',
    ':focus': {
      outline: 0,
    },
  }),
  copyBtn: css({
    display: 'inline-block',
    fontSize: 13,
    textAlign: 'right',
    color: '#3a506b',
    textTransform: 'uppercase',
    border: 'none',
    backgroundColor: 'transparent',
    marginLeft: PADDING,
    padding: 0,
    cursor: 'pointer',
  }),
  reserved: css({
    display: 'inline-block',
  }),
  address: css({
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),
  defaultBtn: css({
    minWidth: '100px',
    width: 'calc(25% - 25px)',
    height: '40px',
    margin: PADDING / 2,
    display: 'inline-block',
    fontSize: '16px',
  }),
  loginBtn: css({
    float: 'right',
    backgroundColor: '#ffffff',
    border: 'solid 2px #ff7092',
  }),
  availableFunds: css({
    marginLeft: '2px',
    display: 'inline-block',
  }),
  loading: LOADING,
  sm: css({
    maxHeight: '20px',
    maxWidth: '20px',
    display: 'inline-block',
    top: '0%',
    transform: 'none',
    verticalAlign: 'middle',
  }),
  disabled: css({
    cursor: 'default',
  }),
  editBtn: css({
    display: 'inline-block',
    width: '198px',
  }),
  prompt: css({
    textAlign: 'center',
  }),
};

export default styles;
