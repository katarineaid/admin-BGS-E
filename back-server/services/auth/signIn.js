module.exports = function isAuthenticated(model, config) {
  return async function(params) {
    return await firstFunction(params, model, config);
  };
};

async function firstFunction(params, model, config) {
  const { identification, password } = params;

  if (identification === "admin" && password === "1") {
    return {
      status: true,
      statusText: "Авторизация пройдена!",
      data: {
        isAuthenticated: true,
        role: "admin",
        userId: "8f7ba937-5c08-11e7-80e6-00155d0c0907",
        userName: "Administrator",
        accessToken: "0d6d2ace-7347-11e7-a205-005056bb72a2"
      }
    };
  }

  return {
    status: false,
    statusText: "Авторизация не прошла!",
    data: {
      isAuthenticated: false,
      accessToken: "",
      role: "viewer"
    }
  };
}
