import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';

import DomainList from './DomainList';

class DomainCollapseListItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
  }

  static defaultProps = {
    children: undefined,
    open: false,
  };

  constructor(props) {
    super(props);
  }


  render() {
    const { children, open } = this.props;

    return (<Collapse in={open} timeout="auto" unmountOnExit>
      <DomainList>
        {children}
      </DomainList>
    </Collapse>);
  }
}


export default DomainCollapseListItem;
