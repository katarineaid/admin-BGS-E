import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SingRouter from './routers/SignRouter';

import PageMarkup from '../common/PageMarkup';

const LandingSideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 400px;
  background-color: #ffffff;
  padding: 50px;
  min-height: 610px;
  box-sizing: border-box;
  margin-top:50px;
`;

const LandingPage = ({ isSignUpSuccess }) => (
  <PageMarkup>
    <LandingSideBar>
      <SingRouter isSignUpSuccess={isSignUpSuccess}/>
    </LandingSideBar>
  </PageMarkup>
);

LandingPage.propTypes = {
  isSignUpSuccess: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isSignUpSuccess: state.account.isSignUpSuccess,
  };
}

export default connect(mapStateToProps)(LandingPage);
