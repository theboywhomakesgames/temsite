const { json } = require('body-parser');
const Item = require('../models/item');
const User = require('../models/user');
const ItemClass = require('../models/itemClass');
const {ObjectId} = require('mongoose').Types;
const _ = require('lodash');
const user = require('../models/user');

module.exports.getItem = (req, res, next) => {
  let data = req.body;

  console.log(data);

  res.json({ success: false });
};

module.exports.addItem = (req, res, next) => {
  let data = req.body;
  console.log("adding new Item: " + data.name);
  Item.findOne({name: data.name})
  .then(item => {
    if(item){
      res.json({ success: false });
    }
    else{
      itm = new Item({...data});
      itm.save()
      .then(result => {
        res.json({ success: true });
      })
      .catch(
        err => {
          console.log(err);
          res.json({ success: false });
        }
      );
    }
  })
  .catch(err => {
    console.log(err);
    res.json({ success: false });
  });
};

module.exports.getItemsOfUser = (req, res, next) => {
  let data = req.body;
  if(!req.body.username || !req.body){
    res.json({ success: false });
    return;
  }
  
  User.findOne({username: data.username})
  .then(user => {
    items = [];
    user.items.forEach((itmid, idx) => {
      Item.findOne({_id: itmid})
      .then(itm => {
        items.push(itm);
        if(idx === user.items.length - 1){
          res.json({items});
        }
      })
      .catch(err => {
        console.log(err);
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.json({ success: false });
  });
};

module.exports.getItems = (req, res, next) => {
  res.json({ success: false });
};

module.exports.getClasses = (req, res, next) => {
  res.json({ success: false });
};

module.exports.classify = (req, res, next) => {
  res.json({ success: false });
};

module.exports.addItemToUser = (req, res, next) => {
  try{
    let data = req.body.items;
    let username = req.body.username;

    if(!data || data.length < 1 || !username){
      return;
    }

    found = [];

    data.forEach((item, idx) => {    
      Item.findOne({_id: ObjectId(item)})
      .then(result => {
        found.push(result);
        if(idx === data.length - 1){
          User.findOne({username})
          .then(user => {
            foundIds = found.map(itm => itm._id);
            user.items = user.items.concat(found);
            user.items = _.uniqWith(user.items, _.isEqual);
            user.save()
            .then(result => {
              res.json({ success: true });
            })
            .catch(err => {
              console.log(err);
              res.json({ success: false });
            });
          })
          .catch(err => {
            console.log(err);
            res.json({ success: false });
          });
        }
      }).catch(err => {
        console.log(err);
        res.json({ success: false });
      });
    });
  }
  catch{
    res.json({ success: false });
  }
};