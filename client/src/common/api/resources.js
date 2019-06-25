export default function resourcesApi(config, axios) {
  function get(userId) {
    const params = {
      userId
    };
    return axios.post(`${config.domain}/api/v1/resources/read`, params)
    .then(response => (response));
  }

  function getPlugins(userId) {
    const params = {
      userId
    };
    return axios.post(`${config.domain}/api/v1/resources/read/plugins`, params)
    .then(response => (response));
  }

  function updatePlugins(userId, updatedPlugins) {
    const params = {
      userId,
      updatedPlugins
    };
    return axios.post(`${config.domain}/api/v1/resources/update/plugins`, params)
    .then(response => (response));
  }

  return {
    get,
    getPlugins,
    updatePlugins
  };
}