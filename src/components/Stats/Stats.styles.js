import { css } from 'glamor';
import { FLEX_PANEL } from '../common/style-constants';

const styles = {
  container: FLEX_PANEL,
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
