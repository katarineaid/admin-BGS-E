import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SignIn from '../pages/signIn/SignIn';
import SignUp from '../pages/signUp/SignUp';

const SignRouter = ({ isSignUpSuccess }) => {
  const {
    signUp,
    signIn,
    goToSignIn,
    goToSignUp,
  } = SignRouter;

  return [
    <Route
      key={0}
      exact
      path={signUp}
      render={({ history }) =>
        (<SignUp
          redirectButtonName={SignIn.title}
          goToSignIn={goToSignIn(history)}
        />)}
    />,
    <Route
      key={1}
      exact
      path={signIn}
      render={({ history }) =>
        <SignIn redirectButtonName={SignUp.title} goToSignUp={goToSignUp(history)}/>}
    />,
  ];
};

SignRouter.signIn = '/sign_in';
SignRouter.signUp = '/register';

SignRouter.goToSignIn = routerHistory => () => {
  routerHistory.push(SignRouter.signIn);
};

SignRouter.goToSignUp = routerHistory => () => {
  routerHistory.push(SignRouter.signUp);
};

export default SignRouter;
