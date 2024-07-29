// db.js
import SQLite from 'react-native-sqlite-storage';
import CryptoJS from 'crypto-js';

const db = SQLite.openDatabase({ name: 'login.db', location: 'default' });

export const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password TEXT NOT NULL)',
      [],
      (tx, result) => {},
      error => console.error(error)
    );
  });
};

export const insertUser = (username, password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      (tx, result) => {},
      error => console.error(error)
    );
  });
  console.log('hash password::', hashedPassword);
};

export const checkUser = (username, password, callback) => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, hashedPassword],
      (tx, result) => {
        if (result.rows.length > 0) {
          callback(true);
        } else {
          callback(false);
        }
      },
      error => console.error(error)
    );
  });
};

export const showDataTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users',
        [],
        (tx, result) => {
          // Extract rows from the result set
          const len = result.rows.length;
          console.log('result.rows',result.rows);
          console.log(`Number of rows returned: ${len}`);
          for (let i = 0; i < len; i++) {
            const row = result.rows.item(i);
            console.log(`Row ${i + 1}:`, row);
          }
        },
        error => console.error(error)
      );
    });
};