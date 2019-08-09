import React from 'react';
import PropTypes from 'prop-types';

import { Page as UIPage } from '@expandorg/components/app';

import Notifications from './Notifications';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

import Survey from './Survey/Survey';

import styles from './Page.module.styl';

export default function Page({ children, title, ...rest }) {
  return (
    <UIPage {...rest} title={title}>
      <Navbar title={title} />
      <Sidebar />
      <div className={styles.container}>{children}</div>
      <Footer />
      <Notifications />
      <Survey />
    </UIPage>
  );
}

Page.propTypes = {
  title: PropTypes.string.isRequired,
};
