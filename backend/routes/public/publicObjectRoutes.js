// routes/publicObjectRoutes.js
const express = require('express');
const publicObjectController = require('../../controllers/public/publicObjectController');

const router = express.Router();

// Route untuk mendapatkan semua objek
router.get('/objects/get-all', publicObjectController.getAllPublicObjects);

// Route untuk mendapatkan objek berdasarkan ID
router.get('/objects/get-by-id/:id', publicObjectController.getPublicObjectById);

module.exports = router;
