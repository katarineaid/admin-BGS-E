module.exports = function create(model, config) {
  return async function (params) {
    return await firstFunction(params, model, config);
  };
};

const templateSource = require('../../data/templateSource');

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
  const sourceId = model.library.uuid();
  const sourceName = `source&${sourceId}`;

  const pathUserDir = __dirname + `/../../data/` + userId;

  const filePathCreatingSource = __dirname + `/../../data/${userId}/${sourceName}.json`;
  const fileDataCreatingSource = JSON.stringify(templateSource);

  const isFileSourceRecorded = await model.db.writeFile({
    filePath: filePathCreatingSource,
    fileData: fileDataCreatingSource
  });
  if (!isFileSourceRecorded.status) {
    return isFileSourceRecorded
  }
  const markerTime =new Date();
  const year = markerTime.getFullYear();
  const month = markerTime.getMonth()+1;
  const date = markerTime.getDate();
  const hours = markerTime.getHours();
  const minutes = markerTime.getMinutes();

  const markerTimeString = `${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes} ${date}-${month<10?`0${month}`:month}-${year}`;
  const creatingSource = {
    "name": sourceName,
    "alias": `Источник данных ${markerTimeString}`,
  };

  /**Второй файл для клиента, потому что не понятно можно ли расширять файл source своими полями**/
  const fPathDirtySource = __dirname + `/../../data/${userId}/dirty${sourceName}.json`;
  const fDataDirtySource = JSON.stringify(Object.assign({},
    templateSource,
    creatingSource,
    { workspaceName }));
  const isFileDirtySourceRecorded = await model.db.writeFile({
    filePath: fPathDirtySource,
    fileData: fDataDirtySource
  });
  if (!isFileDirtySourceRecorded.status) {
    return isFileDirtySourceRecorded
  }
  /**--------------------------------------------------------------------------------------------**/

  const workspaceData = await model.db.readFile(pathUserDir + `/${workspaceName}.json`);

  if (!workspaceData.status) {
    return workspaceData
  }
  const { data: workspace } = workspaceData;

  const updatedWorkspaceChildren = workspace.children.slice();


  updatedWorkspaceChildren.push(creatingSource);

  const updatedWorkspace = Object.assign({}, workspace, { children: updatedWorkspaceChildren });

  const filePathUpdatedWorkspace = __dirname + `/../../data/${userId}/${workspaceName}.json`;
  const fileDataUpdatedWorkspace = JSON.stringify(updatedWorkspace);

  const isFileWorkspaceRecorded = await model.db.writeFile({
    filePath: filePathUpdatedWorkspace,
    fileData: fileDataUpdatedWorkspace
  });

  if (!isFileWorkspaceRecorded.status) {
    const isOldFileWorkspaceRecorded = await model.db.writeFile({
      filePath: filePathUpdatedWorkspace,
      fileData: JSON.stringify(workspace)
    });
    if (!isOldFileWorkspaceRecorded.status) {
      return Object.assign({}, isFileWorkspaceRecorded, isOldFileWorkspaceRecorded)
    }
    return isFileWorkspaceRecorded
  }


  return {
    status: true,
    statusText: 'Свойства источника',
    data: Object.assign({}, creatingSource, templateSource)
  }
}