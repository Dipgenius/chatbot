const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Dummy user store
const users = new Map(); // In-memory user store, use a database in production

// Sign-up route
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    if (users.has(username)) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.set(username, { password: hashedPassword, investment: 1000, points: 0 });
    res.json({ success: true });
});

// Log-in route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.get(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ success: true, token });
});

// Add other routes for profile, investment, etc.

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
