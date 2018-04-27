import { css } from 'glamor';
import { BORDER_R, PADDING } from '../common/style-constants';

const styles = {
  container: css({
    textAlign: 'center',
    display: 'block',
  }),
  description: css({
    margin: '3%',
    display: 'block',
  }),
  inputContainer: css({
    display: 'inline-block',
    width: 'calc(100% - 62px)',
    verticalAlign: 'middle',
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
  input: css({
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
  value: css({
    display: 'block',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),
};

export default styles;
