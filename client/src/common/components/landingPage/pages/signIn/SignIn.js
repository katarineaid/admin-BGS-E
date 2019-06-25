import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import accountFunctions from '../../../../store/account/accountActions';
import SignInForm from './SignInForm';
import SignAccountRedirectButton from '../../common/SignAccountRedirectButton';


class SingInAccount extends Component {
  static title = 'Вход';

  static propTypes = {
    isSingInError: PropTypes.bool,
    singInMessage: PropTypes.string,
    accountActions: PropTypes.shape({ singIn: PropTypes.func, refreshAccount: PropTypes.func })
      .isRequired,
    goToSignUp: PropTypes.func.isRequired,
    redirectButtonName: PropTypes.string.isRequired,
  };

  static defaultProps = {
    singInMessage: undefined,
    isSingInError: false,
  };

  constructor(props) {
    super(props);
    this.onSingIn = this.onSingIn.bind(this);
    this.refreshAccount = this.refreshAccount.bind(this);
  }

  componentDidMount() {
    this.refreshAccount();
  }

  onSingIn(data) {
    const { singIn } = this.props.accountActions;
    singIn(data.login, data.password);
  }

  refreshAccount() {
    const { isSingInError, accountActions } = this.props;
    if (isSingInError) {
      accountActions.refreshAccount();
    }
  }

  render() {
    const {
      singInMessage,
      isSingInError,
      goToSignUp,
      redirectButtonName,
    } = this.props;

    return [
      <SignInForm
        key={1}
        onChange={this.refreshAccount}
        singIn={this.onSingIn}
        title={SingInAccount.title}
        isSingInError={isSingInError}
        singInMessage={singInMessage}
      />
    ];
  }

}

function mapStateToProps(state) {
  return {
    isSingInError: state.account.isSingInError,
    singInMessage: state.account.singInMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accountActions: bindActionCreators(accountFunctions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingInAccount);
/*,
      <SignAccountRedirectButton
        key={2}
        label={redirectButtonName}
        onClick={goToSignUp}
      />,*/