import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';

function createMapRouter(ComposedComponent) {

  const rootPath = '/admin/view';

  class MapRouter extends Component {
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
        currentSourceName: MapRouter.getSourceCurrentName(this.props),
      };
    }


    static getDerivedStateFromProps(nextProps) {
      return {
        currentSourceName: MapRouter.getSourceCurrentName(nextProps),
      };
    }

    static getSourceCurrentName(props) {
      const { location, match } = props;
      const pathname = location.pathname;
      const matched = matchPath(pathname, { path: `${rootPath}/:item` }, match);
      return matched && matched.params.item || '';
    }

    render() {
      const { children, ...other } = this.props;
      const { currentSourceName } = this.state;
      return (
        <ComposedComponent
          currentSourceName={currentSourceName}
          {...other}
        >
          {children}
        </ComposedComponent>
      );
    }
  }

  return MapRouter

}

export default createMapRouter;