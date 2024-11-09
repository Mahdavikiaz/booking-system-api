const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController.js');
const auth = require('../middleware/authMiddleware.js');
const authorize = require('../middleware/authorize.js');

// routes for booking
router.post('/', auth, authorize(['admin']), bookingController.createBooking);
router.get('/', auth, bookingController.getAllBookings);
router.put('/:id', auth, authorize(['admin']), bookingController.updateBooking);
router.delete(
  '/:id',
  auth,
  authorize(['admin']),
  bookingController.deleteBooking
);
router.get('/search', auth, bookingController.searchBooking);

module.exports = router;
