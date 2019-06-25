import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 8px 30px 0 30px;
  overflow:hidden
`;

const SidebarWrapper = ({ children }) => <Wrapper> {children} </Wrapper>;

SidebarWrapper.propTypes = {
  children: PropTypes.node,
};

SidebarWrapper.defaultProps = {
  children: undefined,
};

export default SidebarWrapper;
