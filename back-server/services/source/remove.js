module.exports = function remove(model, config) {
  return async function (params) {
    return await firstFunction(params, model, config);
  };
};

async function firstFunction(params, model, config) {
  const { userId, sources, workspaceName } = params;
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

  if (!sources || !sources.length) {
    return {
      status: false,
      statusText: 'Не указаны источники к удалению',
      data: {}
    }
  }

  const pathUserDir = __dirname + `/../../data/${userId}`;

  const workspaceData = await model.db.readFile(pathUserDir + `/${workspaceName}.json`);
  if (!workspaceData.status) {
    return workspaceData
  }
  const { data: workspace } = workspaceData;
  const { children: workspaceChildren } = workspace;

  /**Оставляет те источники, которых НЕТ в списке от клиента**/
  const updatedWorkspaceChildren = workspaceChildren.filter(
    (childOnServer) =>
      !sources.some(
        (sourceFromClient) =>
          sourceFromClient.indexOf(childOnServer.name) !== -1
      )
  );

  const filePathWorkspace = pathUserDir + `/${workspaceName}.json`;
  const fileDataWorkspace = JSON.stringify(Object.assign({},
    workspace,
    { children: updatedWorkspaceChildren }));

  const isFileWorkspaceRecorded = await model.db.writeFile({
    filePath: filePathWorkspace,
    fileData: fileDataWorkspace
  });

  if (!isFileWorkspaceRecorded.status) {
    return isFileWorkspaceRecorded
  }

  const isDeleteFile = sources.map(async (sourceFromClient) => {
    await model.db.deleteFile(`${pathUserDir}/dirty${sourceFromClient}.json`);
    return await model.db.deleteFile(`${pathUserDir}/${sourceFromClient}.json`)
  });

  const prom = await Promise.all(isDeleteFile).then(values => {
    return { status: true, values }
  }, reason => {
    return { status: false, reason }
  });

  if (!prom.status) {
    return {
      status: false,
      statusText: 'Ошибка при удлаении источников 1',
      data: prom.reason
    }
  }
  let checkError = prom.values.some(item => !item.status);
  if (checkError) {
    //TODO нужно придумать как востанавливать ${workspaceName}.json т.к. не понятно какие файлы удалились а какие нет
    return {
      status: false,
      statusText: 'Ошибка при удлаении источников 2',
      data: {}
    }
  }
  return {
    status: true,
    statusText: 'Источники удалены',
    data: JSON.parse(fileDataWorkspace)
  };
}