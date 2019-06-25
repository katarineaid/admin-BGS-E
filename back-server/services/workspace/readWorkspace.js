module.exports = function read(model, config) {
  return async function (params) {
    return await firstFunction(params, model, config);
  };
};

async function firstFunction(params, model, config) {
  const { userId, workspaceName } = params;
  if (!userId) {
    return {
      status: false,
      statusText: 'Не указан идентификатор пользователя',
      data: {}
    }
  }
  if (!workspaceName) {
    return {
      status: false,
      statusText: 'Не указано имя рабочего пространства',
      data: {}
    }
  }

  const pathUserDir = __dirname + `/../../data/${userId}`;

  const workspaceData = await model.db.readFile(pathUserDir + `/${workspaceName}.json`);

  if (!workspaceData.status) {
    return workspaceData
  }

  return {
    status: true,
    statusText: `Рабочее пространство ${workspaceName}`,
    data: workspaceData.data
  }
}