import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import classnames from 'classnames';
import { css } from 'glamor';

const styles = {
  overlay: css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  active: css({
    backgroundColor: 'rgba(38, 42, 57, 0.8)',
    zIndex: 3,
    opacity: 1,
  }),
  button: css({
    position: 'absolute',
    top: 20,
    right: 20,
  }),
  root: css({
    backgroundColor: '#fff',
    borderRadius: 3,
  }),
};

export default class Modal extends PureComponent {
  constructor() {
    super();
    autoBind(this);
  }

  componentDidMount() {
    if (this.props.isActive) {
      document.addEventListener('click', this.handleClick);
    }
  }

  componentWillReceiveProps(newProps) {
    const { isActive } = newProps;

    if (isActive !== this.props.isActive) {
      if (isActive) {
        document.addEventListener('click', this.handleClick);

        return;
      }

      document.removeEventListener('click', this.handleClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    const { canClose, onClose } = this.props;

    if (!this.modalRef.contains(e.target) && canClose) {
      onClose();
    }
  }

  handleRef(ref) {
    this.modalRef = ref;
  }

  render() {
    const {
      children,
      isActive,
      className,
      canClose,
      onClose,
    } = this.props;

    const classes = classnames({
      [styles.overlay]: true,
      [styles.active]: isActive,
    });

    return (
      <div ref={this.handleRef} className={classes}>
        <div className={`${className} ${styles.root}`}>
          {canClose && (
            <button href="#" className={styles.button} onClick={onClose}>
              <img src="../images/close-btn.png" alt="Close" />
            </button>
          )}

          {children}
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  isActive: false,
  className: '',
  canClose: true,
  onClose() {},
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  canClose: PropTypes.bool,
  onClose: PropTypes.func,
};
