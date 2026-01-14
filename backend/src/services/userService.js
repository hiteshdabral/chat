const createError = require('http-errors');

const { isKeyExpired, generateKey, signToken, deleteConfedentialData } = require('../helpers/auth');
const { userErrors } = require('../constant');
// src/services/user.service.js
module.exports = ({ userRepository }) => ({
  async registerUser(data) {
    const { name, email, password } = data;
    if (!name.trim()) throw createError(422, userErrors.INVALID_NAME);
    if (!password && !email.trim()) throw createError(422, userErrors.INVALID_EMAIL);
    if (!password.trim() || password.trim().length < 6)
      throw createError(422, userErrors.INVALID_PASSWORD);
    const exists = await userRepository.findByEmail(data.email);
    if (exists) throw createError(403, userErrors.USER_EXISTS);
    return userRepository.create(data);
  },

  async loginUser(data) {
    const { email, password } = data;
    if (!email.trim()) throw createError(422, userErrors.INVALID_EMAIL);
    if (!password.trim()) throw createError(422, userErrors.INVALID_PASSWORD);
    let user = await userRepository.findForAuth(email);
    if (!user) throw createError(404, userErrors.USER_NOT_FOUND);
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw createError(401, userErrors.INVALID_CREDENTIALS);

    if (isKeyExpired(user.keyExpiry)) {
      const { key, keyExpiry } = generateKey();
      await userRepository.update(user.id, { key, keyExpiry });
      signToken(user, user.key);
    }
    const accesstoken = await signToken({ id: user.id, key: user.key }, 15 * 60);
    const refreshtoken = await signToken({ id: user.id, key: user.key }, 7 * 24 * 60 * 60);

    user = deleteConfedentialData(user.dataValues);

    return { user, token: `JWT ${accesstoken}`, refreshtoken: `JWT ${refreshtoken}` };
  },

  async getById(id) {
    return userRepository.findById(id);
  },
});
