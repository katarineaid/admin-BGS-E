import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../../reduxFormControls/FormInput';
import { validatePluginsForm } from '../../../validation/plugins';

import FormWrapper from '../../common/smallForm/FormWrapper';
import FormBody from '../../common/smallForm/FormBody';
import DialogActions from '@material-ui/core/DialogActions';
import { required } from '../../../validation/fields';

const formName = 'workspace';


let WorkspaceForm = ({
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
        <Field name="alias" id="alias" component={FormInput} label="Название" validate={required}/>
      </FormBody>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={reset}>Отменить</Button>
        <Button variant="contained"
                color="primary"
                type="submit"
                disabled={pristine || submitting}>Сохранить</Button>
      </DialogActions>
    </FormWrapper>
  );


WorkspaceForm = reduxForm({
  form: formName,
  enableReinitialize: true,
  validate: validatePluginsForm,
})(WorkspaceForm);

WorkspaceForm.propTypes = {
  cancel: PropTypes.func,
  save: PropTypes.func.isRequired,
};

WorkspaceForm.defaultProps = {
  cancel: () => {
    console.log('отмена')
  },
};

export default WorkspaceForm;