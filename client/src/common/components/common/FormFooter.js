import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DialogActions from '@material-ui/core/DialogActions';

const StyledDialogActions = styled(DialogActions)`
  flex: 0 0 auto;
`;

const FormFooter = ({ children }) => <StyledDialogActions> {children} </StyledDialogActions>;

FormFooter.propTypes = {
  children: PropTypes.node,
};

FormFooter.defaultProps = {
  children: undefined,
};

export default FormFooter