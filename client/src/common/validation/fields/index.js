const fieldsValidations = (value, allValues, props) => {
  let error;
  if (value) {
    const fieldsObject = {};
    value.forEach((item) => {
      if (item.name) {
        const name = item.name.toLowerCase();
        if (!fieldsObject[name]) {
          fieldsObject[name] = name;
        } else {
          error = 'Имена полей не должны совпадать';
        }
      } else {
        error = 'Поле обязательно для заполнения';
      }
    });
  }
  return error;
};

const required = (text) => {
  if (!text) {
    return 'Поле обязательно для заполнения'
  }
  if (text.search(/\s/g) === -1) {
    return null;
  }
  if (text.search(/\s/g) === 0) {
    return 'Пробел не может быть первым символом'
  }
  if (!/\S/.test(text)) {
    return 'Поле не может быть пустым'
  }
  return null;
};

const latinNumbers = (text) => {
  const re = new RegExp(/\W/g);
  if (!text) {
    return 'Поле может содержать только буквы (A-Z a-z) и цифры (0-9)';
  }
  if (re.test(text)) {
    return 'Поле может содержать только буквы (A-Z a-z) и цифры (0-9)';
  }
  if (text.search(/\s/g) !== -1) {
    return 'Поле может содержать только буквы (A-Z a-z) и цифры (0-9)';
  }
  if (text.search(/[0-9]/) === 0) {
    return 'Цифра не может быть первым символом';
  }
};

export {
  fieldsValidations,
  required,
  latinNumbers
};