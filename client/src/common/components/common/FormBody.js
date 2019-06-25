import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;

const FormBody = ({ children }) => <Body> {children} </Body>;

FormBody.propTypes = {
  children: PropTypes.node,
};

FormBody.defaultProps = {
  children: undefined,
};

export default FormBody