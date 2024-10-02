const db = require('../db');

const createUser = (username, email, password, role, callback) => {
  console.log("reached userModel")
  const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(query, [username, email, password, role], (err, results) => {
    if (err) return callback(err);
    callback(null, results.insertId);
  });
};

const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

module.exports = { createUser, findUserByEmail };
