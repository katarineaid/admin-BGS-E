import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Markup = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const PageMarkup = ({ children }) => <Markup> {children} </Markup>;

PageMarkup.propTypes = {
  children: PropTypes.node,
};

PageMarkup.defaultProps = {
  children: undefined,
};

export default PageMarkup;
