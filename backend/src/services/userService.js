const createError = require('http-errors');
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
});
