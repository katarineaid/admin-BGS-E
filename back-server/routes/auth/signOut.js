/**
 * Роутер для выхода из аккаунта
 * @module auth/signOut
 */
function signOut(service) {
  /**
   * Роутер для выхода из аккаунта
   * @method SignOut
   * @route  {POST} /auth/signOut
   * @param {object} req
   * @param {object} req.body
   * @param {string} req.body.accessToken - токен пользователя
   * @return {object} res - ответ с сервиса
   * @return {string} res.accessToken - токен пользователя
   * @return {boolean} res.isAuthenticated - статус авторизации
   * @return {boolean} res.status - статус ответа
   * @return {string} res.statusText - текст ответа
   */
  return async function(req, res) {
    const params = {
      accessToken: req.body.accessToken,
    };
    const data = await service.signOut(params);
    res.json(data);
  };
}
module.exports = signOut;
