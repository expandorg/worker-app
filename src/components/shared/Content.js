import React from 'react';
import PropTypes from 'prop-types';

import DocumentTitle from 'react-document-title';

import VerifyEmailPopup from './email/VerifyEmailPopup';

import OnboardingSurvey from './profile/OnboardingSurvey';

import './Content.styl';

const Content = ({ children, title }) => (
  <DocumentTitle title={`${title} - Gems`}>
    <div className="gem-content">
      <VerifyEmailPopup />
      <div className="gem-content-title">{title}</div>
      {children}
      <OnboardingSurvey />
    </div>
  </DocumentTitle>
);

Content.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Content;
