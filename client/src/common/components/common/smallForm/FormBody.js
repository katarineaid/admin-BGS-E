import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormBody = ({ children }) => <Body> {children} </Body>;

FormBody.propTypes = {
  children: PropTypes.node,
};

FormBody.defaultProps = {
  children: undefined,
};

export default FormBody