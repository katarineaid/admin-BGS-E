export default function userApi(config, axios) {
  function signIn(identification, password) {
    const params = {
      identification,
      password,
    };
    return axios.post(`${config.domain}/api/v1/auth/signIn`, params).then(response => (response));
  }

  function isAuthenticated({ accessToken }) {
    const params = { accessToken };
    return axios.post(`${config.domain}/api/v1/auth/isAuthenticated`, params).then(response => (response));
  }

  function signOut(accessToken) {
    const params = {
      accessToken,
    };
    return axios.post(`${config.domain}/api/v1/auth/signOut`, params).then(response => (response));
  }

  function signUp(params) {
    return axios.post(`${config.domain}/api/v1/auth/signUp`, params).then(response => (response));
  }

  return {
    signUp,
    signIn,
    signOut,
    isAuthenticated,
  };
}