const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./database.db');

// Create users table if not exists
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT
)`);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

// Serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle login / auto-register
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
    if (err) return res.send('❌ Database error.');

    if (row) {
      // User exists, check password
      if (row.password === password) {
        res.redirect('/frontpage.html?msg=' + encodeURIComponent('✅ Successfully logged in!'));
      } else {
        res.send('❌ Incorrect password.');
      }
    } else {
      // Auto-register new user
      db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, password], (err) => {
        if (err) return res.send('❌ Registration failed.');
        res.redirect('/frontpage.html?msg=' + encodeURIComponent('✅ Registered and logged in!'));
      });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('🌐 Server running at http://localhost:3000');
});
