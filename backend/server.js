const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt'); // Added bcrypt

const app = express();
const port = 3000; // Adjust port number if needed

// Replace with your actual database credentials
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Example Code for connecting to MySQL
app.post('/signup', async (req, res) => {
    const saltRounds = 10; // Adjust based on security needs
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const [result] = await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
      res.json({ message: 'Account created successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating account');
    }
});

