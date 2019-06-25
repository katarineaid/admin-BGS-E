
const validateEmail = (text) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(text)) {
    return '';
  }
  return 'Неверный формат почты';
};

const mustMatch = (password, confirmation) => {
  if (password !== confirmation) {
    return 'Не соответствует паролю';
  }
  return '';
};


const validations = (values) => {
  const errors = {};
  const re = new RegExp(/\W/g);
  if (!values.login) {
    errors.login = 'Поле обязательно для заполнения';
  } else if (values.login.length < 3) {
    errors.login = 'Поле должно быть не менее 3 символов';
  } else if (re.test(values.login)) {
    errors.login = 'Только буквы (A-Z a-z), цифры (0-9) и спецсимволы';
  }
  if (!values.password) {
    errors.password = 'Поле обязательно для заполнения';
  }

  errors.mail = validateEmail(values.mail);
  errors.confirmation = mustMatch(values.password, values.confirmation);

  return errors;
};

export default validations;
