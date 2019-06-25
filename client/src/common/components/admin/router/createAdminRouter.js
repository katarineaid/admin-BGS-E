import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';
import addAdminActions from '../actions/addAdminActions';


function createAdminRouter(ComposedComponent) {
  const rootPath = '/admin';

  class AdminRouter extends Component {
    static propTypes = {
      children: PropTypes.node,
      history: PropTypes.objectOf(PropTypes.any).isRequired,
    };
    static defaultProps = {
      children: undefined,
    };

    constructor(props) {
      super(props);
      this.state = {
        currentItem: AdminRouter.getAdminCurrentItem(this.props),
      };

      this.selectItem = this.selectItem.bind(this);
    }

    static getDerivedStateFromProps(nextProps) {
      return {
        currentItem: AdminRouter.getAdminCurrentItem(nextProps),
      };
    }

    static getAdminCurrentItem(props) {
      const { location, match } = props;
      const pathname = location.pathname;
      const matched = matchPath(pathname, { path: `${rootPath}/:item` }, match);
      return matched && matched.params.item || '';
    }

    selectItem(item) {
      const { history } = this.props;
      history.push(`${rootPath}/${item}`);
    }

    render() {
      const { children, ...other } = this.props;
      const { currentItem } = this.state;
      return (
        <ComposedComponent
          currentItem={currentItem}
          selectItem={this.selectItem}
          {...other}
        >
          {children}
        </ComposedComponent>
      );
    }
  }


  return addAdminActions(AdminRouter);
}


export default createAdminRouter;
