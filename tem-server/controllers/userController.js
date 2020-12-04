const User = require('../models/user');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const Order = require('../models/order');
const mongoose = require('mongoose');

module.exports.register = (req, res, next) => {
  let data = req.body;
  console.log("new register:");
  console.log(data.username);
  if(!data.username){
    console.log("no username");
    res.json({ success: false });
  }else{
    bcrypt.hash(data.password, 12)
    .then(result => {
      data.password = result;
      User.findOne({username: data.username})
      .then(user => {
        if(user){
          console.log("user exists");
          res.json({ success: false });
        }else{
          let u = new User({...data, addresses: [{address: data.address, zipcode: data.zipcode, city: data.zipcode}], is_seller: false});
          u.save()
          .then(result => {
            console.log("successfully created a user");
            req.session.isAuth = true;
            req.session.username = u.username;
            req.session.isSeller = u.isSeller;
            res.json({ success: true });
          })
          .catch(err => {
            console.log(err);
          });
        }
      })
      .catch();
    })
    .catch(err => {
      console.log(err);
    });
  }
};

module.exports.login = (req, res, next) => {
  console.log('processing login req:');
  username = req.body.username;
  password = req.body.password;

  console.log("username: " + username);

  User
  .findOne({
    username
  })
  .then((user) => {
    if(user){
      console.log("found user");
      bcrypt.compare(password, user.password)
      .then(result => {
        console.log("correct pass: " + result);
        if(result){
          req.session.isAuth = true;
          req.session.isSeller = user.is_seller;
          req.session.username = user.username;
          res.json({ isAuth: req.session.isAuth, isSeller: req.session.isSeller, username: req.session.username, success: true });
        }
        else{
          console.log("wrong pass");
          req.session.isAuth = false;
          res.json({ success: false, err_message: "مشخصات اشتباه است" });
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
    else{
      console.log("no such user");
      req.session.isAuth = false;
      req.session.isSeller = false;
      req.session.username = null;
      res.json({ success: false, err_message: "مشخصات اشتباه است", isAuth: req.session.isAuth, isSeller: req.session.isSeller, username: req.session.username});
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

module.exports.logout = (req, res, next) => {
  req.session.isAuth = false;
  res.json({ success: true });
};

module.exports.isAuth = (req, res, next) => {
  res.json({
    isAuth: req.session.isAuth, isSeller: req.session.isSeller, username: req.session.username
  });
};

module.exports.getItemsOf = (req, res, next) => {
};

module.exports.getSalesOf = (req, res, next) => {
  console.log("getting sales");
  if(req.session.isSeller){
    let username = req.body.username;

    User.findOne({username: username})
    .then(result => {
      console.log(result.sales);
      ids = []
      result.sales.forEach(element => {
        ids.push(mongoose.Types.ObjectId(element));
      });
      Order.find({ _id: { $in: ids } })
      .then(results => {
        res.json({success: true, sales: results});
      })
      .catch(err => {
        console.log(err);
        res.json({success: false});
      });
    })
    .catch(err => {
      console.log(err);
      res.json({success: false});
    });
  }
  else{
    console.log("not seller");
  }
}

// TODO: fix the naming and stuff
module.exports.getAddressesOf = (req, res, next) => {
  console.log("getting addresses");
  let username = req.session.username;
  console.log(username);
  User.findOne({username: username})
  .then(result => {
    if(result)
      res.json({success: true, addresses: result.addresses});
    else{
      console.log("not found");
      res.json({success: false});
    }
  })
  .catch(err => {
    console.log(err);
    res.json({success: false});
  });
}

module.exports.addAddress = (req, res, next) => {
  let username = req.session.username;
  let newAddresses = req.body.addresses;
  User.find({username: username})
  .then(user => {
    if(user){
      user.addresses = user.addresses.concat(newAddresses);
      user.save()
      .then(result => {
        res.json({success: true});
      })
      .catch(err => {
        console.log(err);
        res.json({success: false, err_message: "مشکل در سیو"});        
      });
    }
    else{
      res.json({success: false, err_message: "یوزر نیم اشتباه"});
    }
  })
  .catch(err => {
    console.log(err);
    res.json({success: false, err_message: "یوزر نیم اشتباه"});
  });
};