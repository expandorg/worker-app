import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogHeadline } from '../../../common/Dialog';

import Button from './Button';
import Alignment from './Alignment';

import styles from './Modal.module.styl';

export default class Modal extends Component {
  static propTypes = {
    headline: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,

    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    const {
      button, headline, children, onClose, visible,
    } = this.props;
    return (
      <Dialog visible={visible} onHide={onClose} contentLabel="modal" >
        {headline &&
          <DialogHeadline>
            {headline}
          </DialogHeadline>
        }
        <div className={styles.container}>
          {children}
          <Alignment padding="medium" align="left">
            <Button className={styles.confirm} onClick={onClose}>
              {button}
            </Button>
          </Alignment>
        </div>
      </Dialog>
    );
  }
}
