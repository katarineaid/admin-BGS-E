import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../../../reduxFormControls/FormInput';
import validations from '../../../../validation/account';

import SignForm from '../../common/SignForm';
import FormTitle from '../../common/FormTitle';
import SubmitButton from '../../common/SubmitButton';
import FormMessage from '../../common/FormMessage';


const SignInForm = ({
                      handleSubmit,
                      pristine,
                      submitting,
                      singIn,
                      singInMessage,
                      isSingInError,
                      title,
                    }) => (
  <SignForm onSubmit={handleSubmit(singIn)}>
    <FormTitle title={title} />
    <Field id="1" name="login" component={FormInput} label="Логин" fullWidth />
    <Field id="2" name="password" component={FormInput} label="Пароль" fullWidth type="password" />
    <SubmitButton label="Войти" disabled={pristine || submitting} />
    {singInMessage && !!singInMessage.length && <FormMessage text={singInMessage} isError={isSingInError} />}
  </SignForm>);

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  singIn: PropTypes.func.isRequired,
  isSingInError: PropTypes.bool.isRequired,
  singInMessage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'SingInForm',
  validate: validations,
})(SignInForm);
