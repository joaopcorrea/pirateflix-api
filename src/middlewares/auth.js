const jwt = require("jsonwebtoken");
const { StatusCodes } = require('http-status-codes');
const { OK, UNAUTHORIZED} = StatusCodes;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  let json = {message:'', content:{}};

  if (!authHeader) {
    json.message = "Token was not provided.";
    return res.status(UNAUTHORIZED).json(json);
  }

  const [, token] = authHeader.split(' ');

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) throw err;
  
      req.userId = decoded.userId;
      return next();
    });
  } catch (err) {
    json.message = "Invalid token.";
    return res.status(UNAUTHORIZED).json(json);
  }
}