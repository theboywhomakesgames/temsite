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
};

module.exports.placeOrder = (req, res, next) => {
  try{
    console.log("new order req");
    let data = req.body;
    let order = new Order(data);
    let failed = false;

    let date = new Date();
    order.final_at = date.toISOString();
    
    order.save()
    .then(async(result) => {
      console.log("placed order: " + result);
      obj = {};
      order.cart.forEach((element) => {
        if(obj[element.seller]){
          obj[element.seller].count++;

          if(!element.benefit){
            element.benefit = 0;
          }

          obj[element.seller].benefit += element.benefit * element.count;
        }else{
          if(!element.benefit){
            element.benefit = 0;
          }

          obj[element.seller] = { count: element.count, benefit: element.benefit * element.count };
        }
      });

      for(let key in obj){
        await User.findOne({username: key})
        .then(async(user) => {
          user.sales.push(order._id);
          user.balance += obj[key].benefit;
          await user.save();
        })
        .catch(err => {
          res.json({ success: false });
          failed = true;
        });
      }
      
      if(!failed){
        res.json({success: true});
      }
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false });
    });

    let id = order._id.toString();
    console.log(id);
  }
  catch(err){
    console.log(err);
    res.json({ success: false });
  }
};

module.exports.getOrdersOf = (req, res, next) => {
  let username = req.body.username;

  Order.find({ buyer: username })
  .then(results => {
    res.json({results: results, success: true});
  })
  .catch(err => {
    res.json({success: false})
    console.log(err);
  })
};

module.exports.getBalanceOf = (req, res, next) => {
  let username = req.body.username;
  console.log("getting balance of : " + username);

  User.findOne({ username: username })
  .then(user => {
    console.log(user.balance);
    res.json({success: true, balance: user.balance});
  })
  .catch(err => {
    console.log(err);
    res.json({success: false, balance: 0});
  });
};