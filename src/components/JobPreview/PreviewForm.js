import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useService, Panel } from '@expandorg/components';
import { Form, Module, formProps, FormDataProvider } from '@expandorg/modules';
import { moduleControls } from '@expandorg/modules/app';

import styles from './PreviewForm.module.styl';

const fd = {};

export default function PreviewForm({ form, variables, onSubmit, onNotify }) {
  const svc = useService();
  const services = useMemo(
    () => new Map([['fileUpload', svc.resolve('fileUpload')]]),
    [svc]
  );

  return (
    <div className={styles.container}>
      <Panel className={styles.panel}>
        <FormDataProvider formData={fd}>
          <Form
            className={styles.form}
            form={form}
            controls={moduleControls}
            services={services}
            validation={false}
            variables={variables}
            onSubmit={onSubmit}
            onNotify={onNotify}
          >
            {props => <Module {...props} />}
          </Form>
        </FormDataProvider>
      </Panel>
    </div>
  );
}

PreviewForm.propTypes = {
  form: formProps,
  variables: PropTypes.shape({}),
  onNotify: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

PreviewForm.defaultProps = {
  form: null,
  variables: null,
};
