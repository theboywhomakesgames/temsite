const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const item = require('../models/item');

router.post('/getItem', itemController.getItem);
router.post('/getItems', itemController.getItems);
router.post('/addItem', itemController.addItem);
router.post('/getItemsOf', itemController.getItemsOfUser);
router.post('/addItemToUser', itemController.addItemToUser);
router.post('/removeItemsFromUser', itemController.removeItemsFromUser);
router.post('/placeOrder', itemController.placeOrder);

module.exports = router;