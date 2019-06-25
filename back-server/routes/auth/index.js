const isAuthenticated = require('./isAuthenticated');
const signIn = require('./signIn');
const signOut = require('./signOut');

/**
 * Модуль для работы с авторизацией пользователя
 * @function ----Authorization Routes----
 * @param authService
 * @param router {object} - express router
 * @returns {*}
 */
function auth(authService, router) {
  /**
   * Роут для аутентификации пользователя
   * @method auth/isAuthenticated
   * @param {function} authService - служба
   * @param authService.name {string} - имя службы
   * @requires module:auth/isAuthenticated
   * @return {function} - метод сервиса для аутентификации пользователя
   */
  router.post('/auth/isAuthenticated', isAuthenticated(authService));
  /**
   * Роут для идентификации пользователя
   * @method auth/signIn
   * @param {function} authService - служба
   * @param authService.name {string} - имя службы
   * @requires module:auth/signIn
   * @return {function} - метод сервиса для идентификации пользователя
   */
  router.post('/auth/signIn', signIn(authService));
  /**
   * Роут для выхода пользователя из системы
   * @method auth/signOut
   * @param {function} authService - служба
   * @param authService.name {string} - имя службы
   * @requires module:auth/signOut
   * @return {function} - метод сервиса для выхода пользователя
   */
  router.post('/auth/signOut', signOut(authService));

  return router;
}

module.exports = auth;
