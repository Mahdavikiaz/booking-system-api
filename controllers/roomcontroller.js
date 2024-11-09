const Room = require('../models/Room.js');

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room.' });
  }
};

// Get all rooms
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms.' });
  }
};

// Update room
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!room) return res.status(404).json({ error: 'Room not found.' });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update room.' });
  }
};

// Delete room
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found.' });
    res.status(200).json({ message: 'Room deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete room.' });
  }
};
