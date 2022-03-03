const loginService = require('../services/loginService');
const jwt = require("jsonwebtoken");
const auth = require('../middlewares/auth');
const { StatusCodes } = require('http-status-codes');
const { OK, UNAUTHORIZED} = StatusCodes;

module.exports = {
  login: async (req, res) => {
    let json = {message:'', content:{}};

    const { email, password } = req.body; 

    let user = await loginService.login(email, password);
    let token = "";

    if (user) {
      const token = jwt.sign({ userId: user.code }, process.env.JWT_SECRET, { expiresIn: 300 });

      json.content = {
        code: user.code,
        token
      };

      res.status(OK).json(json);
    } else {
      json.message = "Credenciais inválidas";
      res.status(UNAUTHORIZED).json(json);
    }
  },
};