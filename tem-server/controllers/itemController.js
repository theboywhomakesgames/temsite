const { json } = require('body-parser');
const Item = require('../models/item');
const User = require('../models/user');
const Order = require('../models/order');
const ItemClass = require('../models/itemClass');
const {ObjectId} = require('mongoose').Types;
const _ = require('lodash');
const user = require('../models/user');
const { result } = require('lodash');

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
  let sent = false;
  
  User.findOne({username: data.username})
  .then(async(user) => {
    if(user.items.length > 0){
      let items = [];

      for(let i = 0; i < user.items.length; i++){
        itmid = user.items[i];
        try{
          itm = await Item.findOne({_id: itmid});
          items.push(itm);
        }
        catch(err){
          console.log(err);
          res.json({ success: false });
          sent = true;
        }
      }

      if(!sent){
        res.json({ items });
      }
    }
    else
      res.json({items: []});
  })
  .catch(err => {
    console.log(err);
    res.json({ success: false });
    sent = true;
  });
};

module.exports.getItems = (req, res, next) => {
  console.log("getting item");
  console.log(req.body);
  Item.find({...req.body})
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    console.log(err);
    res.json({ success: false });
  });
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

module.exports.removeItemsFromUser = async(req, res, next) => {
  try{
    console.log("removing item from user:");
    let data = req.body.items;
    let username = req.body.username;

    if(!data || data.length < 1 || !username){
      return;
    }

    console.log(data + " from " + username);
    
    try{
      let user = await User.findOne({username});
      console.log(user.items);
      for(let i = 0; i < data.length; i++){

        id = data[i];
        console.log("rm " + id);

        user.items = user.items.filter(itm => {
          return itm._id != id;
        });
        
      }
      console.log(user.items);
      user.save()
      .then(result => {
        console.log("saved");
        res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.json({ success: false });
      });

    }
    catch(err){
      console.log(err);
      res.json({ success: false });
    }
  }
  catch{
    res.json({ success: false });
  }
}

module.exports.placeOrder = (req, res, next) => {
  try{
    console.log("new order req");
    let data = req.body;
    let order = new Order(data);

    let date = Date.now();
    order.final_at = date.toString();
    
    order.save()
    .then(result => {
      console.log("placed order: " + result);
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false });
    });

    let id = order._id.toString();
    console.log(id);
    
    order.cart.forEach(element => {
      User.findOne({username: element.seller})
      .then(result => {
        if(result.sales){
          result.sales.push(id);
          result.sales = _.uniqWith(result.sales, _.isEqual);
        }
        else{
          result.sales = [];
          result.sales.push(id);
        }

        result.save()
        .then(result => {
          res.json({ success: true });
        })
        .catch(err => {
          console.log(err);
          res.json({ success: false });
        })
      })
      .catch(err => {
        console.log(err);
        res.json({ success: false });
      });
    });
  }
  catch(err){
    console.log(err);
    res.json({ success: false });
  }
}