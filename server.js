const express = require('express');
const connectDB = require('./config/db');
const { connect } = require('mongoose');

const app = express();

// Connect to DB
connectDB();

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));