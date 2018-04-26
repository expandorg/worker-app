import { css } from 'glamor';
import { BLUE } from '../common/style-constants';

const styles = {
  body: css({
    width: '100%',
    height: '100%',
    background: '#f2f2f2',
    fontFamily: 'Poppins',
    color: BLUE,
    textAlign: 'center',
  }),
  heading: css({
    margin: 0,
  }),
  logo: css({
    width: 119,
    height: 50,
    marginTop: 30,
  }),
};

export default styles;
