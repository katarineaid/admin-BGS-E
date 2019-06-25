import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';


const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

const SubmitButton = ({ label, ...props }) => (<ButtonWrapper>
  <Button type="submit" color="primary" {...props} >{label}</Button>
</ButtonWrapper>);

export default SubmitButton;
