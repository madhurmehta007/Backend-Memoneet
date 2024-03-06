// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { validationResult } = require('express-validator');
const logger = require('./middleware/loggingMiddleware');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api', todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
