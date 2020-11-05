const { json } = require('body-parser');
const Item = require('../models/item');
const User = require('../models/user');

module.exports.getItem = (req, res, next) => {
  let data = req.body;

  console.log(data);

  res.json({ success: false });
};

module.exports.getItemsOfUser = (req, res, next) => {
  let data = req.body;
  if(!req.body.username)
    res.json({ success: false });
    return;
    
  // get the items

  res.json({ success: false });
};