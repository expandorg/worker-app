import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.styl';

function Modal({ heading, children, toggleModal }) {
  return (
    <div className={styles.modalDialog}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeading}>
          <div className={styles.headingText}>
            {heading}
          </div>
          {toggleModal && (
            <button className={styles.closeBtn} onClick={toggleModal}>
              <img src="/images/close-btn.png" alt="Close" />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  toggleModal: null,
};

Modal.propTypes = {
  heading: PropTypes.element.isRequired,
  toggleModal: PropTypes.func,
};

export default Modal;
