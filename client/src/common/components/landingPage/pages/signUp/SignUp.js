import React, { Component } from 'react';

class SignUp extends Component {
  static title = 'Регистрация';

  constructor(props) {
    super(props);
    this.refreshAccount = this.refreshAccount.bind(this);
  }

  componentDidMount() {
    this.refreshAccount();
  }


  refreshAccount() {
    const { isSignUpError, accountActions } = this.props;
    if (isSignUpError) {
      accountActions.refreshAccount();
    }
  }

  render() {

    return (
      <div>
        Форма регистрации
      </div>
    );
  }

}


export default SignUp;
