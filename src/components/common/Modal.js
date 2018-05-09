import React from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.styl';

function Modal({ heading, children, onClose }) {
  return (
    <div className={styles.modalDialog}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeading}>
          <div className={styles.headingText}>
            {heading}
          </div>
          {onClose && (
            <button className={styles.closeBtn} onClick={onClose}>
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
  onClose: null,
};

Modal.propTypes = {
  heading: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
  onClose: PropTypes.func,
};

export default Modal;
