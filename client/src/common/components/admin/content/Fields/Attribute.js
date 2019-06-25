import React from 'react';
import PropTypes from 'prop-types';

const Attribute = ({
                     name,
                     nameComponent,
                     aliasComponent,
                     typeComponent,
                     deleteComponent,
                   }) => (
  <div id={name}>
    {nameComponent}
    {aliasComponent}
    {typeComponent}
    {deleteComponent}
  </div>);

Attribute.createField = (
  name = 'nameField',
  alias = 'Имя поля',
  type = 'esriFieldTypeString'
) =>
  ({
    name, alias, type
  });
Attribute.generateGlobalId = () => ({
  name: 'GlobalID',
  alias: 'GlobalID',
  type: 'esriFieldTypeGlobalID'
});

Attribute.propTypes = {
  name: PropTypes.string,
  nameComponent: PropTypes.node.isRequired,
  aliasComponent: PropTypes.node.isRequired,
  typeComponent: PropTypes.node.isRequired,
  deleteComponent: PropTypes.node.isRequired,
};

Attribute.defaultProps = {
  name: undefined,
};

export default Attribute;