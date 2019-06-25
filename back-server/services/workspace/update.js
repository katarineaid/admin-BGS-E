module.exports = function update(model, config) {
  return async function (params) {
    return await firstFunction(params, model, config);
  };
};

async function firstFunction(params, model, config) {
  const defaultNamesProps = ["name", "alias","children"];
  const { userId, updatedWorkspace } = params;
  if (!userId) {
    return {
      status: false,
      statusText: 'Не указан идентификатор пользователя',
      data: {}
    }
  }
  if (!updatedWorkspace) {
    return {
      status: false,
      statusText: 'Не передали данные для обновления',
      data: {}
    }
  }

  const propsWorkspace = Object.keys(updatedWorkspace);

  if (propsWorkspace.length !== defaultNamesProps.length) {
    return {
      status: false,
      statusText: 'Не полные данные для обновления',
      data: {}
    }
  }
  if (propsWorkspace.sort().join('') !== defaultNamesProps.sort().join('')) {
    return {
      status: false,
      statusText: 'Не корректные данные для обновления',
      data: {}
    }
  }
  const pathUserDir = __dirname + `/../../data/${userId}`;
  const localSourceData = await model.db.readFile(pathUserDir + '/localSource.json');

  if (!localSourceData.status) {
    return localSourceData
  }
  const { data: localSource } = localSourceData;

  const updatedLocalSource = localSource.map((workspaceOnServer) => {
    if (workspaceOnServer.name === updatedWorkspace.name) {
      /**Это для того, чтобы children, не отображались в левой панели**/
      const { name, alias, url } = updatedWorkspace;
      return {
        name, alias, url, children: []
      }
    }
    return workspaceOnServer
  });

  const filePath = pathUserDir + `/${updatedWorkspace.name}.json`;
  const fileData = JSON.stringify(updatedWorkspace);

  const isFileRecorded = await model.db.writeFile({ filePath, fileData });

  if (!isFileRecorded.status) {
    return isFileRecorded
  }

  const filePathLocalSource = pathUserDir + `/localSource.json`;
  const fileDataLocalSource = JSON.stringify(updatedLocalSource);

  const isFileLocalSourceRecorded = await model.db.writeFile({
    filePath: filePathLocalSource,
    fileData: fileDataLocalSource
  });

  if (!isFileLocalSourceRecorded.status) {
    return isFileLocalSourceRecorded
  }

  return {
    status: true,
    statusText: 'Рабочее пространство успешно обновлено',
    data: updatedWorkspace

  }
}