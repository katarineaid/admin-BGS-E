module.exports = function remove(model, config) {
  return async function (params) {
    return await firstFunction(params, model, config);
  };
};

async function firstFunction(params, model, config) {
  const { userId, workspaces } = params;
  if (!userId) {
    return {
      status: false,
      statusText: 'Не указан идентификатор пользователя',
      data: {}
    }
  }

  if (!workspaces || !workspaces.length) {
    return {
      status: false,
      statusText: 'Не указаны раб.пространства к удалению',
      data: {}
    }
  }

  const pathUserDir = __dirname + `/../../data/${userId}`;

  const localSourceData = await model.db.readFile(pathUserDir + '/localSource.json');

  if (!localSourceData.status) {
    return localSourceData
  }
  const { data: localSource } = localSourceData;

  /**Оставляет те рабочие области, которых НЕТ в списке от клиента**/
  const updatedLocalSource = localSource.filter(
    (workspaceOnServer) =>
      !workspaces.some(
        (workspaceFromClient) =>
          workspaceFromClient.indexOf(workspaceOnServer.name) !== -1
      )
  );

  const filePathLocalSource = pathUserDir + `/localSource.json`;
  const fileDataLocalSource = JSON.stringify(updatedLocalSource);

  const isFileLocalSourceRecorded = await model.db.writeFile({
    filePath: filePathLocalSource,
    fileData: fileDataLocalSource
  });

  if (!isFileLocalSourceRecorded.status) {
    return isFileLocalSourceRecorded
  }

  const isDeleteFile = workspaces.map(async (workspaceFromClient) => {
    return await model.db.deleteFile(`${pathUserDir}/${workspaceFromClient}.json`)
  });
  const prom = await Promise.all(isDeleteFile).then(values => {
    return {status:true, values}
  }, reason => {
    return {status:false, reason}
  })

  if (!prom.status){
    return {
      status: false,
      statusText: 'Ошибка при удлаении рабочих областей 1',
      data: prom.reason
    }
  }
  let checkError = prom.values.some(item => !item.status);
  if (checkError) {
    //TODO нужно придумать как востанавливать localSource.json т.к. не понятно какие файлы удалились а какие нет
    return {
      status: false,
      statusText: 'Ошибка при удлаении рабочих областей 2',
      data: {}
    }
  }
  return {
    status: true,
    statusText: 'Рабочие пространства удалены',
    data: updatedLocalSource
  }
}