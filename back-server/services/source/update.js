module.exports = function update(model, config) {
  return async function (params) {
    return await firstFunction(params, model, config);
  };
};

const templateSource = require('../../data/templateSource');

async function firstFunction(params, model, config) {
  const defaultNamesProps = ["type", "crs", "metadata", "features", "name", "alias"];
  const { userId, updatedSource, workspaceName } = params;
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
      statusText: 'Не передали имя рабочего пространства',
      data: {}
    }
  }
  if (!updatedSource) {
    return {
      status: false,
      statusText: 'Не передали данные для обновления',
      data: {}
    }
  }

  const propsSource = Object.keys(updatedSource);

  for (let i = 0; i < defaultNamesProps.length; i++) {
    let nameProps = defaultNamesProps[i];
    let flag = propsSource.includes(nameProps);
    if (!flag) {
      return {
        status: false,
        statusText: `Не передали свойство ${nameProps} для обновления`,
        data: {}
      }
    }
  }

  const pathUserDir = __dirname + `/../../data/${userId}`;

  /**Обновление dirty source --------------------------------------------------------------------**/
  const filePathDirtySource = pathUserDir + `/dirty${updatedSource.name}.json`;
  const fileDataDirtySource = JSON.stringify(updatedSource);
  const isFileDirtySourceRecorded = await model.db.writeFile({
    filePath: filePathDirtySource,
    fileData: fileDataDirtySource
  });

  if (!isFileDirtySourceRecorded.status) {
    return isFileDirtySourceRecorded
  }
  /**--------------------------------------------------------------------------------------------**/
  /**Обновление source --------------------------------------------------------------------------**/
  const filePathSource = pathUserDir + `/${updatedSource.name}.json`;
  const { type, crs, metadata, features } = updatedSource;
  const fileDataSource = JSON.stringify({ type, crs, metadata, features });
  const isFileSourceRecorded = await model.db.writeFile({
    filePath: filePathSource,
    fileData: fileDataSource
  });

  if (!isFileSourceRecorded.status) {
    return isFileSourceRecorded
  }
  /**--------------------------------------------------------------------------------------------**/
  /**Обновление alias в workspace ---------------------------------------------------------------**/
  const filePathWorkspace = pathUserDir + `/${workspaceName}.json`;
  const workspaceData = await model.db.readFile(filePathWorkspace);
  if (!workspaceData.status) {
    return workspaceData
  }
  const { data: workspace } = workspaceData;
  const { children: workspaceChildren } = workspace;
  const updatedWorkspaceChildren = workspaceChildren.map((child)=>{
    if(child.name===updatedSource.name){
      return Object.assign({}, child, {alias:updatedSource.alias})
    }
    return child;
  });
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
  /**--------------------------------------------------------------------------------------------**/

  return {
    status: true,
    statusText: 'Свойства источника успешно обновлены',
    data: updatedSource

  }
}