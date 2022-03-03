const userService = require('../services/userService');
const { StatusCodes } = require('http-status-codes');
const { OK, CREATED, NO_CONTENT, BAD_REQUEST, NOT_FOUND} = StatusCodes;

module.exports = {
  getAll: async (req, res) => {
    let json = {message:'', content:[]};

    let users = await userService.getAll();

    for (let i in users){
      json.content.push({
        code: users[i].code,
        name: users[i].name,
        email: users[i].email
      });
    }
    res.json(json);
  },

  getSingle: async (req, res) => {
    let json = {message:'', content:[]};

    const { code } = req.params;
    let user = await userService.getSingle(code);

    if (user) {
      json.content = {
        code: user.code,
        name: user.name,
        email: user.email
      };
      res.status(OK).json(json);
    } else {
      json.message = "Usuário não encontrado";
      res.status(NOT_FOUND).json(json);
    }
  },

  insert: async (req, res) => {
    const { name, email, password } = req.body;
    
    let json = {message:'', content:{}};

    if (!name) { 
      json.message = "Name is invalid: " + name;
      return res.status(BAD_REQUEST).json(json);
    }
    if (!email) { 
      json.message = "E-mail is invalid: " + email;
      return res.status(BAD_REQUEST).json(json);
    }
    if (!password) { 
      json.message = "Password is invalid: " + password;
      return res.status(BAD_REQUEST).json(json);
    }

    let code = await userService.insert(name, email, password);

    if (code) {
      json.content = {
        code,
        name,
        email
      };
      res.status(CREATED).json(json);
    } else {
      json.message = "Não foi possível adicionar usuário";
      res.status(BAD_REQUEST).json(json);
    }
  },

  update: async (req, res) => {
    let json = {message:'', content:{}};

    const { code } = req.params;
    const { name, email, password } = req.body;

    if (!code) { 
      json.message = "Code is invalid: " + code;
      return res.status(BAD_REQUEST).json(json);
    }
    if (!name) { 
      json.message = "Name is invalid: " + name;
      return res.status(BAD_REQUEST).json(json);
    }
    if (!email) { 
      json.message = "E-mail is invalid: " + email;
      return res.status(BAD_REQUEST).json(json);
    }
    if (!password) { 
      json.message = "Password is invalid: " + password;
      return res.status(BAD_REQUEST).json(json);
    }

    let affectedRows = await userService.update(code, name, email, password);

    if (affectedRows) {
      json.content = {
        code,
        name,
        email
      };
      res.status(OK).json(json);
    } else {
      json.message = "Usuário não encontrado";
      res.status(NOT_FOUND).json(json);
    }    
  },

  delete: async (req, res) => {
    let json = {message:'', content:{}};

    const { code } = req.params;
    let affectedRows = await userService.delete(code);

    if (affectedRows) {
      res.status(NO_CONTENT).json(json);
    } else {
      json.message = "Usuário não encontrado";
      res.status(NOT_FOUND).json(json);
    }
  },
}