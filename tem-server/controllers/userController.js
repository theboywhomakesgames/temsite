const User = require('../models/user');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

module.exports.register = (req, res, next) => {
  let data = req.body;
  console.log("new register:");
  console.log(data);
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
          let u = new User({...data, is_seller: false});
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
  console.log('processing login:');
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
          req.session.isAuth = false;
          res.json({ success: false });
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
    else{
      req.session.isAuth = false;
      req.session.isSeller = false;
      req.session.username = null;
      res.json({ isAuth: req.session.isAuth, isSeller: req.session.isSeller, username: req.session.username, success: true });
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