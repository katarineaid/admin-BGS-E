import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import FormInput from '../../reduxFormControls/FormInput';
import FormSelect from '../../reduxFormControls/FormSelect';
import { required, fieldsValidations } from '../../../validation/fields';
import { typeGeometryValues } from '../../../constants/typeGeometry';
import { crsValues } from '../../../constants/crs';

import FormWrapper from '../../common/FormWrapper';
import FormBody from '../../common/FormBody';
import FormFooter from '../../common/FormFooter';
import FormSectionStyled from '../../common/FormSectionStyled';

import AttributesFrom from './Fields/AttributesFrom';
import { connect } from 'react-redux';

const formName = 'source';

const generateListForFiledId = (attributes = []) => {
  const unique = {};
  const list = [];
  attributes.map((attribute) => {
    const { name, alias } = attribute;
    if (!unique[name]) {
      unique[name] = name;
      list.push({ name: alias, value: name })
    }
  });
  return list;
};


let SourceForm = ({
                    cancel,
                    save,
                    pristine,
                    reset,
                    submitting,
                    handleSubmit,
                    attributes,
                  }) =>
  (
    <FormWrapper onSubmit={handleSubmit(save)}>
      <FormBody>
        <Field name="alias" id="alias" component={FormInput} label="Название" validate={required}/>
        <FormSectionStyled name="crs">
          <FormSectionStyled name="properties">
            <Field name="name"
                   id="name"
                   component={FormSelect}
                   values={crsValues}
                   label="Система координат"/>
          </FormSectionStyled>
        </FormSectionStyled>
        <FormSectionStyled name="metadata">
          <Field name="idField"
                 id="idField"
                 values={generateListForFiledId(attributes)}
                 component={FormSelect}
                 label="Название поля для идентификации объектов"/>
          <Field name="geometryType"
                 id="geometryType"
                 component={FormSelect}
                 values={typeGeometryValues}
                 label="Тип геометрии"/>
          <FieldArray name="fields" component={AttributesFrom} validate={fieldsValidations}/>
        </FormSectionStyled>
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


SourceForm = reduxForm({
  form: formName,
  enableReinitialize: true,
})(SourceForm);

SourceForm.propTypes = {
  cancel: PropTypes.func,
  save: PropTypes.func.isRequired,
};

SourceForm.defaultProps = {
  cancel: () => {
    console.log('отмена')
  },
  attributes: []
};

const selector = formValueSelector(formName);
SourceForm = connect((state) => {
  const attributes = selector(state, 'metadata.fields');
  return { attributes }
})(SourceForm);

export default SourceForm;