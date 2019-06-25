module.exports = function isAuthenticated(model, config) {
  return async function(params) {
    return await firstFunction(params, model, config);
  };
};

async function firstFunction(params, model, config) {
  let isAuth = await model.auth.isAuthenticated(params);
  return isAuth;
}