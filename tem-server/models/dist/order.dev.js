"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var orderSchema = new Schema({
  buyer: {
    type: String,
    required: true
  },
  final_at: {
    type: Date,
    required: true,
    "default": Date.now
  },
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
  },
  status: {
    type: Number,
    required: true,
    "default": 0
  },
  parcel_code: {
    type: String
  },
  cart: [{
    _id: {
      type: String,
      required: true
    },
    seller: {
      type: String,
      require: true
    },
    count: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    benefit: {
      type: Number,
      required: true
    },
    authCode: {
      type: String
    },
    status: {
      type: Number
    },
    Amount: {
      type: Number
    }
  }]
});
module.exports = mongoose.model('Order', orderSchema);