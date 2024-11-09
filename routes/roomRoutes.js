const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomcontroller.js');
const auth = require('../middleware/authMiddleware.js');
const authorize = require('../middleware/authorize.js');

// routes for room
router.post('/', auth, authorize(['admin']), roomController.createRoom);
router.get('/', auth, roomController.getRooms);
router.put('/:id', auth, authorize(['admin']), roomController.updateRoom);
router.delete('/:id', auth, authorize(['admin']), roomController.deleteRoom);

module.exports = router;
