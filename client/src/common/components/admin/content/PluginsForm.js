import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import FormCheckbox from '../../reduxFormControls/FormCheckbox';
import { validatePluginsForm } from '../../../validation/plugins';

import FormWrapper from '../../common/FormWrapper';
import FormBody from '../../common/FormBody';
import FormFooter from '../../common/FormFooter';

const formName = 'plugins';

let PluginsForm = ({
                     cancel,
                     save,
                     pristine,
                     reset,
                     submitting,
                     handleSubmit,
                   }) =>
  (
    <FormWrapper onSubmit={handleSubmit(save)}>
      <FormBody>
        <Field name="esri" id="esri" component={FormCheckbox} label="ESRI"/>
        <Field name="wfs" id="wfs" component={FormCheckbox} label="WFS"/>
        <Field name="wms" id="wms" component={FormCheckbox} label="WMS"/>
        <Field name="wmts" id="wmts" component={FormCheckbox} label="WMTS"/>
      </FormBody>
      <FormFooter>
        <Button variant="contained" color="primary" onClick={reset}>Отменить</Button>
        <Button variant="contained"
                color="primary"
                type="submit"
                disabled={pristine || submitting}>Сохранить</Button>
      </FormFooter>
    </FormWrapper>
  );


PluginsForm = reduxForm({
  form: formName,
  enableReinitialize: true,
  validate: validatePluginsForm,
})(PluginsForm);

PluginsForm.propTypes = {
  cancel: PropTypes.func,
  save: PropTypes.func.isRequired,
};

PluginsForm.defaultProps = {
  cancel: () => {
    console.log('отмена')
  },
};

export default PluginsForm;