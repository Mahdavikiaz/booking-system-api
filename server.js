require('dotenv').config();

const express = require('express');
const connectDB = require('./config/database.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.js');
const roomRoutes = require('./routes/roomRoutes.js');
const bookingRoutes = require('./routes/bookingRoutes.js');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// app.get('/', (req, res) => {
//   res.send('Booking system API is running.');
// });

app.use('/api/auth', authRoutes);

app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
