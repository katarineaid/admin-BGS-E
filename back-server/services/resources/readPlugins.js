module.exports = function readPlugins(model, config) {
  return async function (params) {
    return await firstFunction(params, model, config);
  };
};

async function firstFunction(params, model, config) {
  const { userId } = params;
  if (!userId) {
    return {
      status: false,
      statusText: 'Не указан идентификатор пользователя',
      data: {}
    }
  }

  const pathUserDir = __dirname + `/../../data/` + userId;

  const pluginsData = await model.db.readFile(pathUserDir + '/plugins.json');

  if (!pluginsData.status) {
    return pluginsData
  }

  return {
    status: true,
    statusText: 'Плагины',
    data: pluginsData.data
  }
}