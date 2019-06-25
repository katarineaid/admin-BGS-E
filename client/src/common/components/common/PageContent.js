import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  height: 100%;
`;

const PageContent = ({ children }) => <Content> { children } </Content>;

PageContent.propTypes = {
  children: PropTypes.node,
};

PageContent.defaultProps = {
  children: undefined,
};

export default PageContent;
