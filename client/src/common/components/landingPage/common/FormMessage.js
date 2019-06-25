import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { red, grey } from '../../../constants/colors';

const Message = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
  min-height: 60px;
  color: ${props => props.color}
`;

const FormMessage = ({ text, isError }) => {
  const textColor = isError ? red : grey;
  return <Message color={textColor}> {text} </Message>;
};

FormMessage.propTypes = {
  text: PropTypes.string.isRequired,
  isError: PropTypes.bool,
};

FormMessage.defaultProps = {
  isError: false,
};


export default FormMessage;
