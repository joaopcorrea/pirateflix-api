const db = require('../db');

module.exports = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email = ? AND password = PASSWORD(?)', [email, password], (error, results) => {
        if (error) { 
          reject(error); return; 
        }

        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(false);
        }
      });
    });
  },
};