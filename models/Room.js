const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ['single', 'double', 'suite'],
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', roomSchema);
