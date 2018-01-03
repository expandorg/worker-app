import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { SIDEBAR_W, BORDER_R, PADDING } from '../style-constants';

// TODO center modal
const styles = {
  modalDialog: css({
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: SIDEBAR_W,
    background: 'rgba(11, 19, 43, 0.8)',
    zIndex: '99999',
    opacity: '1',
    width: `calc(100% - ${SIDEBAR_W}px)`,
  }),
  modalContent: css({
    opacity: 1,
    width: 931,
    height: 600,
    marginTop: 65,
    marginLeft: 50,
    borderRadius: BORDER_R,
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 14px 0 rgba(0, 0, 0, 0.1)',
  }),
  modalHeading: css({
    width: '100%',
    height: 80,
    boxShadow: 'inset 0 -1px 0 0 #f2f2f2',
    marginBottom: PADDING,
  }),
  headingText: css({
    display: 'inline-block',
    width: 'calc(100% - 45px)',
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
          <button href="#" className={styles.closeBtn} onClick={props.toggleModal}>
            <img src="../images/close-btn.png" alt="Close" />
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.element.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Modal;
