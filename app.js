const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Logging Middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

app.get('/about', (req, res) => {
  res.send('This is the About Page.');
});

app.get('/contact', (req, res) => {
  res.send('Contact us at support@example.com');
});

// Trigger a 404 for undefined routes
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(`[Error] ${status}: ${err.message}`);
  
  res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});