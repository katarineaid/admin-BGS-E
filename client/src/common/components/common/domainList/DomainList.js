import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';


const DomainList = ({ children }) => (<List>
  {
    children
  }
</List>);

DomainList.propTypes = {
  children: PropTypes.node,
};

DomainList.defaultProps = {
  children: undefined,
};

export default DomainList;
