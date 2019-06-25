import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { bindActionCreators } from 'redux';
import accountFunctions from '../../store/account/accountActions';
import addAppNavigator from '../app/addAppNavigator';

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  navigator: PropTypes.objectOf(PropTypes.func).isRequired,
  accountActions: PropTypes.shape({
    isAuthenticated: PropTypes.func,
    logoutUser: PropTypes.func
  }).isRequired,
};

const defaultProps = {};

export default function (ComposedComponent) {
  class Authentication extends Component {
    static tokenName = 'accessToken';

    static checkSession(props) {
      const { isAuthenticated, navigator } = props;
      if (!isAuthenticated) {
        navigator.goToLanding();
      }
    }

    constructor(props) {
      super(props);
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.handleQuit = this.handleQuit.bind(this);
    }

    componentWillMount() {
      const { accessToken, cookie } = this.props;

      if (accessToken) {
        const cookies = cookie ? new Cookies(cookie) : new Cookies();
        cookies.set(Authentication.tokenName, accessToken, { path: '/' });
        this.isAuthenticated();
      }

      Authentication.checkSession(this.props);
    }

    componentWillUpdate(nextProps) {
      Authentication.checkSession(nextProps);
    }

    isAuthenticated() {
      const { accountActions, isAuthenticated, accessToken, navigator } = this.props;
      accountActions.isAuthenticated({ accessToken }).then(() => {
        if (!isAuthenticated) {
          navigator.goToLanding();
        }
      });
    }

    handleQuit() {
      const { accountActions, navigator } = this.props;
      const cookie = new Cookies();
      accountActions.logoutUser(cookie.get(Authentication.tokenName)).then(() => {
        cookie.remove(Authentication.tokenName);
        navigator.goToLanding();
      });
    }

    render() {
      return <ComposedComponent handleQuit={this.handleQuit} {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      userName: state.account.userName,
      accessToken: state.account.accessToken,
      isAuthenticated: state.account.isAuthenticated,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      accountActions: bindActionCreators(accountFunctions, dispatch),
    };
  }

  Authentication.propTypes = propTypes;
  Authentication.defaultProps = defaultProps;

  const AuthenticationWithNavigator = addAppNavigator(Authentication);

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticationWithNavigator);
}