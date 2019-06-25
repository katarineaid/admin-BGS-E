/**
 * Роутер для входа в аккаунта
 * @module auth/signIn
 */
function signIn(service) {
  /**
   * Роутер для входа  аккаунта
   * @method SignIn
   * @route {POST} /auth/signIn
   * @param {object} req
   * @param {object} req.body
   * @param {string} req.body.identification - данные по которым будет проходить идентификация пользователя (username or email)
   * @param {string} req.body.password - пароль пользователя
   * @return {object} res - ответ с сервиса
   */
  return async function (req, res) {
    const params = {
      identification: req.body.identification,
      password: req.body.password,
    };
    const data = await service.signIn(params);
    res.json(data);

  };
}

module.exports = signIn;
