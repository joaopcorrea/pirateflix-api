require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));

server.listen(process.env.PORT, () => {
  console.log(`servidor rodando em http://localhost:${process.env.PORT} 🤘`);
});