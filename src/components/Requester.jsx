import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { FLEX_PANEL } from '../style-constants';

const TITLE = 'Post a job to Gems';

const styles = {
  container: FLEX_PANEL,
  formLink: css({
    width: '100%',
    textAlign: 'center',
    margin: '25px',
  }),
};

class Requester extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.setTitle(TITLE);
  }

  render() {
    return (
      <div className={styles.container}>
        <span>Have an organization or company that can use Gems?</span>
        <a
          className={styles.formLink}
          href="https://gemscommunity.typeform.com/to/YRcICm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Please submit this form
        </a>
      </div>
    );
  }
}

Requester.propTypes = {
  setTitle: PropTypes.func.isRequired,
};

export default Requester;
