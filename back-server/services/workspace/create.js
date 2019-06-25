module.exports = function create(model, config) {
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


  const localSourceData = await model.db.readFile(pathUserDir + '/localSource.json');

  if (!localSourceData.status) {
    return localSourceData
  }
  const { data: localSource } = localSourceData;

  const workspaceId = model.library.uuid();
  const workspaceName = `workspace&${workspaceId}`;

  const updatedLocalSource = localSource.slice();

  const markerTime =new Date();
  const year = markerTime.getFullYear();
  const month = markerTime.getMonth()+1;
  const date = markerTime.getDate();
  const hours = markerTime.getHours();
  const minutes = markerTime.getMinutes();

  const markerTimeString = `${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes} ${date}-${month<10?`0${month}`:month}-${year}`;
  const creatingWorkspace = {
    "name": workspaceName,
    "alias": `Рабочее пространство ${markerTimeString}`,
    // "url": "Arrester.svg",
    "children": []
  };

  updatedLocalSource.push(creatingWorkspace);

  const filePathLocalSource = __dirname + `/../../data/` + userId + `/localSource.json`;
  const fileDataLocalSource = JSON.stringify(updatedLocalSource);

  const isFileLocalSourceRecorded = await model.db.writeFile({
    filePath: filePathLocalSource,
    fileData: fileDataLocalSource
  });

  if (!isFileLocalSourceRecorded.status) {
    return isFileLocalSourceRecorded
  }

  const filePathCreatingWorkspace = __dirname + `/../../data/${userId}/${workspaceName}.json`;
  const fileDataCreatingWorkspace = JSON.stringify(creatingWorkspace);

  const isFileWorkspaceRecorded = await model.db.writeFile({
    filePath: filePathCreatingWorkspace,
    fileData: fileDataCreatingWorkspace
  });

  if (!isFileWorkspaceRecorded.status) {
    const isOldFileLocalSourceRecorded = await model.db.writeFile({
      filePath: filePathLocalSource,
      fileData: JSON.stringify(localSource)
    });
    if (!isOldFileLocalSourceRecorded.status) {
      return Object.assign({}, isFileWorkspaceRecorded, isOldFileLocalSourceRecorded)
    }
    return isFileWorkspaceRecorded
  }

  return {
    status: true,
    statusText: 'Создана новая рабочая облсть',
    data: creatingWorkspace
  }
}