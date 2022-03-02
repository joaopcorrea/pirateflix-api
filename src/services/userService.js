const db = require('../db');

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (error, results) => {
        if (error) { 
          reject(error); return; 
        }

        resolve(results);
      });
    });
  },

  getSingle: (code) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE code = ?', [code], (error, results) => {
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

  insert: (name, email, password) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
                              [name, email, password], (error, results) => {
        if (error) { 
          reject(error); console.log(error); return; 
        }

        resolve(results.insertId);
      });
    });
  },

  update: (code, name, email, password) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE code = ?', 
                              [name, email, password, code], (error, results) => {
        if (error) { 
          reject(error); return; 
        }

        resolve(results.affectedRows);
      });
    });
  },

  delete: (code) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE code = ?', [code], (error, results) => {
        if (error) { 
          reject(error); return; 
        }

        resolve(results.affectedRows);
      });
    });
  },
};