module.exports = function (model, config) {
  return async function signOut({ accessToken }) {
    return await singOutByTokenId({ accessToken, model, config });
  };
};

async function singOutByTokenId({ accessToken, model, config }) {
  if (accessToken !== "0d6d2ace-7347-11e7-a205-005056bb72a2") {
    const response = ({
      status: false,
      isAuthenticated: false,
      accessToken: '',
      statusText: 'Не удалось найти токен в БД',
    });
    return {
      status: true,
      statusText: 'Не удалось найти токен в БД',
      data: response
    };
  }

  /**
   const response = ({
    status: false,
    isAuthenticated: false,
    accessToken: '',
    statusText: 'Не удалось удалить токен из БД',
  });
   **/

  const response = ({
    status: true,
    isAuthenticated: false,
    accessToken: '',
    statusText: 'Токен успешно удален из БД',
  });
  return {
    status: true,
    statusText: 'Токен успешно удален из БД',
    data: response
  };
}
