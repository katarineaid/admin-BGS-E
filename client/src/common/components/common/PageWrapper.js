import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`;

const PageWrapper = ({ children }) => <Wrapper> { children } </Wrapper>;

PageWrapper.propTypes = {
  children: PropTypes.node,
};

PageWrapper.defaultProps = {
  children: undefined,
};

export default PageWrapper;
