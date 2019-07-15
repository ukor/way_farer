const jwt = require('jsonwebtoken');
const CustomError = require('../errorHandles/wayFarerError.js');

/**
 * Get the authorization token from the request
 * @return string authorization token
 * @throws exception
 * */
function getToken(request) {
  const { headers, body } = request;

  if (headers.authorization) {
    const bearerHeader = headers.authorization;
    if (typeof bearerHeader === 'undefined') throw new CustomError('Pass a valid authorization token.', 'userError', 403);
    // split at space
    const bearer = bearerHeader.split(' ');
    // return authorization token
    return bearer[1];
  }
  if (!body.token) throw new CustomError('Pass a valid authorization token.', 'userError', 403);
  return body.token;
}

/**
 * Verify authorization token
 * @return boolean
 * @throws exception
 *  */
async function verifyToken(request) {
  const token = getToken(request);
  const verificationToken = await jwt.verify(token, Buffer.from(process.env.jwtSecret, 'base64'));
  if (!verificationToken) throw new CustomError('403 - Forbidden, Unauthorized', 'userError', 403);

  return true;
}

module.exports = verifyToken;
