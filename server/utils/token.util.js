const JWT = require('jsonwebtoken');
const { ServerError } = require('../helpers/error.response');


const createAccessToken = async(data, publicKey) => {
  let accessToken = await JWT.sign(data, publicKey, {
    expiresIn: '1 days',
  });

  return accessToken
}

const createRefreshToken = async(data,privateKey) => {
  let refreshToken = await JWT.sign(data, privateKey, {
    expiresIn: '7 days',
  });

  return refreshToken
}

module.exports = {
  createAccessToken,
  createRefreshToken
};
