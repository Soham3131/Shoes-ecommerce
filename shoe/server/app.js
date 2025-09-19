
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require("axios");

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); 
const returnReplaceRoutes = require('./routes/returnReplaceRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');


// Middleware
app.use(express.json());
app.use(cookieParser());  // ⬅️ enable cookies
app.use(cors({
    origin: 'http://localhost:3000', // your frontend URL
    credentials: true,               // ⬅️ allow cookies from frontend
}));


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/categories', categoryRoutes); // New route
app.use('/api/return-replace', returnReplaceRoutes);


app.use('/api/wishlist', wishlistRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Rohtak Shoes E-commerce Backend!');
});

module.exports = app;