
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');


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

const allowedOrigins = [
  "http://localhost:3000",
  "https://shoes-ecommerce-sohams-projects-32d50290.vercel.app",
  "https://shoes-ecommerce-iota.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
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

module.exports = {app,allowedOrigins}