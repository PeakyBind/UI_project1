const JWT = require('jsonwebtoken');

export default function (token) {
  return JWT.decode(token);
}
