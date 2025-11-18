const db = require('../config/database');

class User {
  static getAll(callback) {
    const query = 'SELECT * FROM users';
    db.all(query, [], (err, rows) => {
      callback(err, rows);
    });
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [id], (err, row) => {
      callback(err, row);
    });
  }

  static create(userData, callback) {
    const { name, email, age } = userData;
    const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
    
    db.run(query, [name, email, age], function(err) {
      callback(err, { insertId: this.lastID });
    });
  }

  static update(id, userData, callback) {
    const { name, email, age } = userData;
    const query = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
    
    db.run(query, [name, email, age, id], function(err) {
      callback(err, { affectedRows: this.changes });
    });
  }

  static delete(id, callback) {
    const query = 'DELETE FROM users WHERE id = ?';
    
    db.run(query, [id], function(err) {
      callback(err, { affectedRows: this.changes });
    });
  }
}

module.exports = User;