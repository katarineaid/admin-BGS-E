module.exports = function updatePlugins(model, config) {
  return async function (params) {
    return await firstFunction(params, model, config);
  };
};

async function firstFunction(params, model, config) {
  const defaultNamesPlugins = ["esri", "wfs", "wms", "wmts"];

  const { userId, updatedPlugins } = params;
  if (!userId) {
    return {
      status: false,
      statusText: 'Не указан идентификатор пользователя',
      data: {}
    }
  }
  if (!updatedPlugins) {
    return {
      status: false,
      statusText: 'Не передали данные для обновления',
      data: {}
    }
  }

  const namesPlugins = Object.keys(updatedPlugins);

  if (namesPlugins.length !== defaultNamesPlugins.length) {
    return {
      status: false,
      statusText: 'Не полные данные для обновления',
      data: {}
    }
  }
  if (namesPlugins.sort().join('') !== defaultNamesPlugins.sort().join('')) {
    return {
      status: false,
      statusText: 'Не корректные данные для обновления',
      data: {}
    }
  }

  const filePath = __dirname + `/../../data/` + userId + `/plugins.json`;
  const fileData = JSON.stringify(updatedPlugins);

  const isFileRecorded = await model.db.writeFile({ filePath, fileData });

  if (!isFileRecorded.status) {
    return isFileRecorded
  }

  return {
    status: true,
    statusText: 'Плагины успешно обновлены',
    data: updatedPlugins

  }
}