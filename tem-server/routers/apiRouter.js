const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

router.get('/getItem', itemController.getItem);

module.exports = router;