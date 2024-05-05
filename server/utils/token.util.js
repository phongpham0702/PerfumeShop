const JWT = require('jsonwebtoken');
const { ServerError } = require('../helpers/error.response');
const createTokenPair = async (data, publicKey, privateKey) => {
  try {
    let accessToken = await JWT.sign(data, publicKey, {
      expiresIn: '1 days',
    });

    let refreshToken = await JWT.sign(data, privateKey, {
      expiresIn: '7 days',
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ServerError(error);
  }
};

module.exports = {
  createTokenPair,
};
