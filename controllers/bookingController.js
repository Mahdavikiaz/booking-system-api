const Booking = require('../models/Booking.js');
const Room = require('../models/Room.js');

// create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, roomId, startDate, endDate } = req.body;

    // cek ketersediaan room
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found.' });
    }

    // cek ketersediaan room pada rentang tanggal yang diinginkan
    const existingBooking = await Booking.findOne({
      room: roomId,
      $or: [
        {
          startDate: { $lt: new Date(endDate) },
          endDate: { $gt: new Date(startDate) },
        },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({
        error: 'Room is already booked during the selected dates.',
      });
    }

    // total price
    const checkIn = new Date(startDate);
    const checkOut = new Date(endDate);

    const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    const totalPrice = days * room.pricePerNight;

    const newBooking = new Booking({
      user: userId,
      room: roomId,
      startDate,
      endDate,
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to booking the room.' });
  }
};

// get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user room', 'name email');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed fetching bookings.' });
  }
};

// update booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) return res.status(404).json({ error: 'Booking not found.' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking.' });
  }
};

// delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found.' });
    res.status(200).json({ message: 'Booking deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking.' });
  }
};

// filter booking
exports.searchBooking = async (req, res) => {
  try {
    const { userId, roomId, startDate, endDate, status } = req.query;

    // create query filter
    const query = {};

    if (userId) query.user = userId;
    if (roomId) query.room = roomId;
    if (startDate) query.startDate = { $gte: new Date(startDate) };
    if (endDate) query.endDate = { $lte: new Date(endDate) };
    if (status) query.status = status;

    // get bookings by filter
    const bookings = await Booking.find(query).populate('user room');

    res.json({
      message: 'Bookings retrieved successfully.',
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
