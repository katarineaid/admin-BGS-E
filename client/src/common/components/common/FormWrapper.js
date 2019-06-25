import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SettingsForm = styled.form`
   display: flex;
   flex-direction: column;
   margin-bottom: 0;
   flex-grow:1;
   overflow-y: auto;
   padding-right:16px;
`;
const FormWrapper = ({ onSubmit, children }) =>
  <SettingsForm onSubmit={onSubmit}> {children} </SettingsForm>;

FormWrapper.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
};

FormWrapper.defaultProps = {
  children: undefined,
};

export default FormWrapper