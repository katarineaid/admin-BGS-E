import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '../../constants/colors';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  min-height:240px;
  background-color: ${white};
  box-shadow: 0 4px 8px 0 rgba(2, 17, 24, 0.1);
  padding: 30px;
  margin-top:50px;
  flex-grow: 1;
`;

const ContentWrapperBody = ({ children }) => (
  <Body>
    {children}
  </Body>);

ContentWrapperBody.propTypes = {
  children: PropTypes.node,
};

ContentWrapperBody.defaultProps = {
  children: undefined,
};

export default ContentWrapperBody;
