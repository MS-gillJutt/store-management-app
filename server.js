
const express = require('express');
const db = require('./database.js');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(express.static('.'));

const saltRounds = 10;

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        db.run(sql, [username, email, hash], function(err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.json({ message: 'User created successfully', userId: this.lastID });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result) {
                res.json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        });
    });
});

app.get('/user/:id', (req, res) => {
    const sql = `SELECT id, username, email FROM users WHERE id = ?`;
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row ? row : { message: 'User not found' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
