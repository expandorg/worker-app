import React from 'react';
import PropTypes from 'prop-types';

import DocumentTitle from 'react-document-title';

import VerifyEmailPopup from './email/VerifyEmailPopup';

import './Content.styl';

const Content = ({ children, title }) => (
  <DocumentTitle title={`${title} - Expand`}>
    <div className="gem-content">
      <VerifyEmailPopup />
      <div className="gem-content-title">{title}</div>
      {children}
    </div>
  </DocumentTitle>
);

Content.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Content;
