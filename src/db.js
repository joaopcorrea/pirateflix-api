const mysql = require('mysql');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

var connection = null;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((error) => {
    if (error) {
      console.log(`❌ Erro ao conectar ao banco de dados: ${error}`);
      setTimeout(handleDisconnect, 2000);
    }
  
    console.log(`🚀 Conectado ao Banco de Dados: ${process.env.DB_NAME}`)
  });

  connection.on('error', function(error) {
    console.log(`🚫 Erro no banco de dados: ${error}`);
    if(error.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw error;
    }
  });
}

handleDisconnect();

module.exports = connection;