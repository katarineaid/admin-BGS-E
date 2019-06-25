export default function workspaceApi(config, axios) {
  const addWorkspace = (userId) => {
    const params = {
      userId
    };
    return axios.post(`${config.domain}/api/v1/workspace/create`, params)
    .then(response => (response));
  };
  const deleteWorkspaces = ({ userId, workspaces }) => {
    const params = {
      userId,
      workspaces
    };
    return axios.post(`${config.domain}/api/v1/workspace/delete`, params)
    .then(response => (response));
  };
  const getWorkspaces = ({ userId }) => {
    const params = {
      userId
    };
    return axios.post(`${config.domain}/api/v1/workspaces/read`, params)
    .then(response => (response));
  };
  const getWorkspace = (userId, workspaceName) => {
    const params = {
      userId,
      workspaceName
    };
    return axios.post(`${config.domain}/api/v1/workspace/read`, params)
    .then(response => (response));
  };

  const updateWorkspace = (userId, updatedWorkspace) => {
    const params = {
      userId,
      updatedWorkspace
    };
    return axios.post(`${config.domain}/api/v1/workspace/update`, params)
    .then(response => (response));
  };
  return {
    addWorkspace,
    deleteWorkspaces,
    getWorkspaces,
    getWorkspace,
    updateWorkspace
  }
}