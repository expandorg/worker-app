import React from 'react';
import PropTypes from 'prop-types';

import DocumentTitle from 'react-document-title';

import styles from './Content.module.styl';

const Content = ({ children, title }) => (
  <DocumentTitle title={`${title} - Gems`}>
    <div className={styles.container}>
      <div className={styles.title}>
        {title}
      </div>
      {children}
    </div>
  </DocumentTitle>
);

Content.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Content;
