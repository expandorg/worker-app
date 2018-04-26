import { css } from 'glamor';

const styles = {
  error: css({
    height: '40px',
    fontSize: 24,
    textAlign: 'center',
    verticalAlign: 'middle',
    backgroundColor: '#6fffe9',
  }),
  closeBtn: css({
    float: 'right',
    fontSize: '16px',
    display: 'inline-block',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 0,
    height: '40px',
    marginRight: '25px',
    ':focus': {
      outline: '0px',
    },
  }),
};

export default styles;
