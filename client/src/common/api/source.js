export default function sourceApi(config, axios) {
  const addSource = (userId, workspaceName) => {
    const params = {
      userId,
      workspaceName
    };
    return axios.post(`${config.domain}/api/v1/source/create`, params)
    .then(response => (response));
  };
  const deleteSources = ({ userId, sources, workspaceName }) => {
    const params = {
      userId,
      sources,
      workspaceName
    };
    return axios.post(`${config.domain}/api/v1/source/delete`, params)
    .then(response => (response));
  };
  const getSource = ({ userId, sourceName }) => {
    const params = {
      userId,
      sourceName,
      dirty: true
    };
    return axios.post(`${config.domain}/api/v1/source/read`, params)
    .then(response => (response));
  };
  const updateSource = ({ userId, updatedSource, workspaceName }) => {
    const params = {
      userId,
      updatedSource,
      workspaceName
    };
    return axios.post(`${config.domain}/api/v1/source/update`, params)
    .then(response => (response));
  };

  return {
    addSource,
    deleteSources,
    getSource,
    updateSource,
  }
}