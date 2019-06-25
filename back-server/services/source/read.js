module.exports = function read(model, config) {
  return async function (params) {
    return await firstFunction(params, model, config);
  };
};

async function firstFunction(params, model, config) {
  const { userId, sourceName, dirty } = params;
  if (!userId) {
    return {
      status: false,
      statusText: 'Не указан идентификатор пользователя',
      data: {}
    }
  }
  if (!sourceName) {
    return {
      status: false,
      statusText: 'Не указано имя источника',
      data: {}
    }
  }
  /**Второй файл для клиента, потому что не понятно можно ли расширять файл source своими полями**/
  if (dirty) {
    const pathUserDir = __dirname + `/../../data/` + userId;

    const sourceData = await model.db.readFile(pathUserDir + `/dirty${sourceName}.json`);

    if (!sourceData.status) {
      return sourceData
    }
    const { data: source } = sourceData;
    return {
      status: true,
      statusText: 'Свойства источника',
      data: source
    }
  }
  /**--------------------------------------------------------------------------------------------**/
  const pathUserDir = __dirname + `/../../data/` + userId;

  const sourceData = await model.db.readFile(pathUserDir + `/${sourceName}.json`);

  if (!sourceData.status) {
    return sourceData
  }
  const { data: source } = sourceData;
  return {
    status: true,
    statusText: 'Свойства источника',
    data: source
  }
}