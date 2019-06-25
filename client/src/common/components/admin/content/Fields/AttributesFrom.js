import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormInput from '../../../reduxFormControls/FormInput';
import FormSelect from '../../../reduxFormControls/FormSelect';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '../../../common/IconButton';
import Checkbox from '../../../common/Checkbox';
import Attribute from './Attribute';
import Attributes from './Attributes';
import AttributesToolbar from './AttributesToolbar';

import { typeValues } from '../../../../constants/typeValues'
import { required, latinNumbers } from '../../../../validation/fields';

const isRequieredField = (fieldName) => {
  return fieldName === 'GlobalID' || fieldName === 'OBJECTID';
}

const getAttributesView = ({ fields }) => {
  const requieredFields = {};
  const fieldsView = fields.map((attribute, index, fieldsArray) => {
    let disable = false;
    const fieldName = fieldsArray.get(index).name;

    if (!requieredFields[fieldName]) {
      requieredFields[fieldName] = fieldName;
      disable = isRequieredField(fieldName);
    }
    return (
      <Attribute
        key={`${attribute}.name`}
        name={fieldName}
        nameComponent={
          <Field
            name={`${attribute}.name`}
            component={FormInput}
            disabled={disable}
            validate={[required, latinNumbers]}
          />
        }
        aliasComponent={
          <Field
            name={`${attribute}.alias`}
            component={FormInput}
            disabled={disable}
            validate={required}
          />
        }
        typeComponent={
          <Field
            name={`${attribute}.type`}
            component={FormSelect}
            values={typeValues}
            disabled={disable}
          />
        }
        deleteComponent={
          <IconButton disabled={disable}
                      icon={DeleteIcon}
                      label="Удалить"
                      onClick={() => fields.remove(index)}/>
        }
      />);
  });

  return fieldsView;
};

const add = ({ fields }) => {
  fields.push(Attribute.createField());
};

const generateGlobalId = ({ fields }) => {
  fields.push(Attribute.generateGlobalId());
};

const deleteGlobalId = ({ fields }) => {
  fields.map((attribute, index, fieldsArray) => {
    const fieldName = fieldsArray.get(index).name;
    if (fieldName === 'GlobalID') {
      fields.remove(index)
    }
  })
};

const checkedGlobalID = fields => (event) => {
  const checked = event.target.checked || false;
  if (checked) {
    generateGlobalId({ fields })
  } else {
    deleteGlobalId({ fields })
  }
};

const hasGlobalID = fields => {
  let hasDIS = false;
  fields.map((attribute, index, fieldsArray) => {
    const fieldName = fieldsArray.get(index).name;
    if (fieldName === 'GlobalID') {
      hasDIS = true
    }
  });
  return hasDIS
};

const AttributesFrom = ({ fields, meta: { error, submitFailed } }) => {
  const valueCheckbox = hasGlobalID(fields);
  return ([
    <Checkbox key={4}
              name="GlobalID"
              id="GlobalID"
              label="Генерировать GlobalID"
              value={valueCheckbox}
              onChange={checkedGlobalID(fields)}
    />,
    <AttributesToolbar key={1} fields={fields} add={add}/>,
    <Attributes key={2}>
      {getAttributesView({ fields })}
    </Attributes>,
    <div key={3}>
      {submitFailed && error &&
      <FormControl error={!!error}>
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
      }
    </div>,
  ])
};

AttributesFrom.propTypes = {
  fields: PropTypes.objectOf(PropTypes.any),
  meta: PropTypes.shape({ error: PropTypes.string, submitFailed: PropTypes.bool }),
};

AttributesFrom.defaultProps = {
  fields: [],
  meta: { error: '', submitFailed: false },
};

export default AttributesFrom;