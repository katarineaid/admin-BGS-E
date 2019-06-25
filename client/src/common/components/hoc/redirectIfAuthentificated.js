import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import addAppNavigator from '../app/addAppNavigator';

const propTypes = {
  isAuthenticated: PropTypes.bool,
};

const defaultProps = {
  isAuthenticated: false,
};


export default function (ComposedComponent) {
  class Authentication extends Component {
    static redirectIfAuthenticated(props) {
      const { navigator, isAuthenticated, role } = props;

      const dictPage = {
        editor: navigator.goToEditor,
        viewer: navigator.goToViewer,
        admin: navigator.goToAdmin,
      };

      if (isAuthenticated) {
        dictPage[role]();
      }
    }

    componentWillMount() {
      Authentication.redirectIfAuthenticated(this.props);
    }

    componentWillUpdate(nextProps) {
      Authentication.redirectIfAuthenticated(nextProps);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.account.isAuthenticated,
      role: state.account.role
    };
  }


  Authentication.defaultProps = defaultProps;
  Authentication.propTypes = propTypes;


  const AuthenticationWithNAvigator = addAppNavigator(Authentication);

  return connect(mapStateToProps)(AuthenticationWithNAvigator);
}
