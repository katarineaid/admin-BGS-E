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

  const listFiles = await model.db.readDir(pathUserDir);

  if (!listFiles.status) {
    return {
      status: false,
      statusText: 'Указан НЕВЕРНЫЙ идентификатор пользователя',
      data: {}
    }
  }

  const { list: fileNames } = listFiles;

  if (!fileNames.length) {
    return {
      status: false,
      statusText: 'У пользователя нет данных',
      data: {}
    }
  }

  const hasMainStructure = fileNames.some(fileName => fileName.indexOf('mainStructure') !== -1);

  if (!hasMainStructure) {
    return {
      status: false,
      statusText: 'У пользователя нет основного файла',
      data: {}
    }
  }

  const mainStructureData = await model.db.readFile(pathUserDir + '/mainStructure.json');

  if (!mainStructureData.status) {
    return mainStructureData
  }
  const { data: mainStructure } = mainStructureData;

  let localSourceData;
  localSourceData = await model.db.readFile(pathUserDir + '/localSource.json');

  if (!localSourceData.status) {
    return localSourceData
  }
  const { data: localSource } = localSourceData;

  //TODO переписать
  mainStructure[0].children[0].children = localSource;

  return {
    status: true,
    statusText: 'Структура ресурсов',
    data: mainStructure

  }
}