async function isAuthenticated({ accessToken }, api) {
  if (accessToken === "0d6d2ace-7347-11e7-a205-005056bb72a2") {
    return {
      data: {
        status: true,
        isAuthenticated: true,
        role: 'admin',
        accessToken: '0d6d2ace-7347-11e7-a205-005056bb72a2',
        userId: '8f7ba937-5c08-11e7-80e6-00155d0c0907',
        userName: 'Administrator',
      },
      status: true,
      statusText: '',
    }
  }
  return {
    data: {
      status: false,
      isAuthenticated: false,
      accessToken: '',
      statusText: 'Токена нет',
    },
    status: false,
    statusText: 'Проверка токена пройдена',
  };
}

module.exports = async function (params, api) {
  return await firstFunction(params, api);
};

async function firstFunction({ accessToken }, api) {
  if (!accessToken) {
    const response = ({
      status: false,
      isAuthenticated: false,
      accessToken: '',
      statusText: 'Токена нет',
    });
    return {
      data: response,
      status: false,
      statusText: 'Токена нет',
    };
  }

  let isAuth = await isAuthenticated({ accessToken }, api);
  return isAuth;
}