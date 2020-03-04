import React, { useEffect, useMemo, useCallback } from 'react';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Page, Navbar } from '@expandorg/components/app';
import { useToggle } from '@expandorg/components';

import { addNotification } from '@expandorg/app-utils/app';
import { loggedInSelector } from '@expandorg/app-auth/selectors';

import Footer from '../shared/Page/Footer';
import AuthDialog from '../Auth/AuthDialog';

import PreviewForm from './PreviewForm';
import Info from './Info';

import { makeJobPreviewSelector } from '../../selectors/jobsSelectors';
import { fetchJobPreview } from '../../sagas/jobsSagas';

import styles from './JobPreview.module.styl';

export default function JobPreview() {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  useEffect(() => {
    dispatch(fetchJobPreview(jobId));
  }, [dispatch, jobId]);
  const previewSelector = useMemo(makeJobPreviewSelector, []);
  const preview = useSelector(s => previewSelector(s, jobId), []);

  const notify = useCallback(
    (type, msg) => {
      dispatch(addNotification(type, msg));
    },
    [dispatch]
  );

  const loggendIn = useSelector(loggedInSelector);
  const [dialog, toggle] = useToggle();

  const submit = useCallback(() => {
    if (!loggendIn) {
      toggle();
    }
  }, [loggendIn, toggle]);

  const name = preview ? preview.name : '';
  return (
    <Page title={name} className={styles.page} sidebar={false} navbar={false}>
      <Navbar title="Job" />
      <div className={styles.container}>
        <Info job={preview} />
        {preview && (
          <PreviewForm
            key={preview.id}
            form={preview.taskForm}
            variables={preview.sample || {}}
            onSubmit={submit}
            onNotify={notify}
          />
        )}
      </div>
      {dialog && <AuthDialog onHide={toggle} />}
      <Footer />
    </Page>
  );
}
