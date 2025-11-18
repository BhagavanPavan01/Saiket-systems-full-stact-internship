const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'REST API with SQLite Database Integration is running!',
    endpoints: {
      getAllUsers: 'GET /api/users',
      getUserById: 'GET /api/users/:id',
      createUser: 'POST /api/users',
      updateUser: 'PUT /api/users/:id',
      deleteUser: 'DELETE /api/users/:id'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler - FIXED: Use proper route pattern
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    requestedUrl: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /api/users',
      'GET /api/users/:id',
      'POST /api/users',
      'PUT /api/users/:id',
      'DELETE /api/users/:id'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}/api`);
  console.log(`📍 Health check: http://localhost:${PORT}/`);
  console.log('\n📋 Available endpoints:');
  console.log('   GET    /api/users          - Get all users');
  console.log('   GET    /api/users/:id      - Get user by ID');
  console.log('   POST   /api/users          - Create new user');
  console.log('   PUT    /api/users/:id      - Update user');
  console.log('   DELETE /api/users/:id      - Delete user');
});