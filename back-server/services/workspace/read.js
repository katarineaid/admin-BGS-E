module.exports = function read(model, config) {
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

  let localSourceData;
  localSourceData = await model.db.readFile(pathUserDir + '/localSource.json');

  if (!localSourceData.status) {
    return localSourceData
  }
  const { data: localSource } = localSourceData;
  return {
    status: true,
    statusText: 'Список локальных ресурсов',
    data: localSource
  }
}