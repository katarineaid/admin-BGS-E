import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Title = styled.div`
  font-size: 20px;
`;

const FormTitle = ({ title }) => <Title> {title} </Title>;


FormTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default FormTitle;
