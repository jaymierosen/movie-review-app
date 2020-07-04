const express = require('express');
const connectDB = require('./config/db');
const { connect } = require('mongoose');

const app = express();

// Connect to DB
connectDB();

app.get('/', (req, res) => res.send('API running'));

// Init middleware
app.use(express.json({
  extended: false
}));

// Define API routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5600;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));