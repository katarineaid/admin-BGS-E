import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 50px 50px 50px;
  min-width: 760px;
  flex-grow: 1;
`;

const useStyles = makeStyles((theme, open, anchor) => ({
  toolbar: theme.mixins.toolbar,
}));

const ContentWrapper = ({ children }) => {
  const classes = useStyles();
  return (
    <Wrapper>
      <div className={classes.toolbar}/>
      {children}
    </Wrapper>
  )
};

ContentWrapper.propTypes = {
  children: PropTypes.node,
};

ContentWrapper.defaultProps = {
  children: undefined,
};

export default ContentWrapper;
