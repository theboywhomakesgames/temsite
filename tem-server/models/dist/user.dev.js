"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  is_seller: {
    type: Boolean
  },
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  addresses: [{
    address: {
      type: String,
      required: true
    },
    zipcode: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  }],
  items: [{
    type: mongoose.Types.ObjectId
  }],
  sales: [{
    type: String
  }],
  balance: {
    type: Number,
    required: true,
    "default": 0
  }
});

userSchema.statics.findByID = function (id) {
  return this.find({
    _id: id
  });
};

userSchema.statics.findByUName = function (uname) {
  return this.find({
    username: uname
  });
};

module.exports = mongoose.model('User', userSchema);