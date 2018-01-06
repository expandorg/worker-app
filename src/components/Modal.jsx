import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { SIDEBAR_W, BORDER_R, PADDING } from '../style-constants';

// TODO center modal
const styles = {
  modalDialog: css({
    position: 'fixed',
    overflow: 'scroll',
    top: '0',
    right: '0',
    bottom: '0',
    left: SIDEBAR_W,
    background: 'rgba(11, 19, 43, 0.8)',
    zIndex: '99999',
    opacity: '1',
    width: `calc(100% - ${SIDEBAR_W}px)`,
    '@media(max-width: 1150px)': {
      width: '100%',
      left: '0',
    },
    '@media(max-width: 660px)': {
      left: '0',
      width: '100%',
    },
  }),
  modalContent: css({
    opacity: 1,
    height: '100%',
    marginTop: 65,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: BORDER_R,
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 14px 0 rgba(0, 0, 0, 0.1)',
    '@media(max-width: 660px)': {
      marginLeft: '0',
      marginRight: '0',
    },
  }),
  modalHeading: css({
    width: '100%',
    height: 80,
    boxShadow: 'inset 0 -1px 0 0 #f2f2f2',
    marginBottom: PADDING,
  }),
  headingText: css({
    display: 'inline-block',
    width: 'calc(100% - 75px)',
    marginLeft: '24px',
    fontSize: '24px',
    lineHeight: '80px',
  }),
  closeBtn: css({
    textAlign: 'right',
    display: 'inline-block',
    cursor: 'pointer',
    border: 0,
  }),
};

function Modal(props) {
  return (
    <div className={styles.modalDialog}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeading}>
          <div className={styles.headingText}>
            {props.heading}
          </div>
          {props.toggleModal && (
            <button href="#" className={styles.closeBtn} onClick={props.toggleModal}>
              <img src="../images/close-btn.png" alt="Close" />
            </button>
          )}
        </div>
        {props.children}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  toggleModal: null,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.element.isRequired,
  toggleModal: PropTypes.func,
};

export default Modal;
