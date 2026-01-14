const moment = require('moment');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/env.json');

const signToken = async (data, keyExpiry) => {
  try {
    const val = await new Promise((resolve, reject) => {
      jwt.sign(data, JWT_SECRET, { expiresIn: keyExpiry }, (error, token) => {
        if (error) {
          reject(error);
        }
        return resolve(token);
      });
    });
    return val;
  } catch (error) {
    error.status = 500;
    throw error;
  }
};

const generateKey = () => {
  const key = `${moment()}${randomstring.generate()}`;
  const keyExpiry = moment().add(3, 'M').seconds(0).format();
  return { key, keyExpiry };
};

const isKeyExpired = (keyExpiry) => {
  return keyExpiry ? moment().diff(moment(keyExpiry)) > 0 : true;
};

const deleteConfedentialData = (user) => {
  delete user.password;
  delete user.key;
  delete user.keyExpiry;
  return user;
};

module.exports = {
  signToken,
  isKeyExpired,
  generateKey,
  deleteConfedentialData,
};
