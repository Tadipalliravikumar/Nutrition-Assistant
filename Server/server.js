require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config');

const userRoute = require('./routes/userRoute');
const suggestionRoute = require('./routes/suggestionRoute');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoute);
app.use('/api/suggestions', suggestionRoute);

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🥗 Nutrition Assistant API is running', version: '2.0' });
});

// Connect DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
