import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 100%;
`;

const SignForm = ({ children, ...other }) => (
  <Form {...other} >
    { children }
  </Form>);

SignForm.propTypes = {
  children: PropTypes.node,
};

SignForm.defaultProps = {
  children: undefined,
};

export default SignForm;
