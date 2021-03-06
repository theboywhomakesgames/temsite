const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');
const userController = require('../controllers/userController');
const ticketController = require('../controllers/ticketController');
const item = require('../models/item');

router.post('/getItem', itemController.getItem);
router.post('/getItems', itemController.getItems);
router.post('/addItem', itemController.addItem);
router.post('/getItemsOf', itemController.getItemsOfUser);
router.post('/addItemToUser', itemController.addItemToUser);
router.post('/removeItemsFromUser', itemController.removeItemsFromUser);
router.post('/placeOrder', itemController.placeOrder);
router.post('/getOrdersOf', itemController.getOrdersOf);
router.post('/getSalesOf', userController.getSalesOf);
router.post('/getAddressesOf', userController.getAddressesOf);
router.post('/getBalanceOf', itemController.getBalanceOf);
router.post('/addAddress', userController.addAddress);
router.post('/createTicket', ticketController.createTicket);
router.post('/replyToTicket', ticketController.replyToTicket);

module.exports = router;