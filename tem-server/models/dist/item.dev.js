"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // 0 -> tshirt , 1 -> mug , 2 -> phone case
  type: {
    type: Number,
    required: true
  },
  variant: {
    type: Number // depending on type this could mean different things

  },
  image_urls: [{
    type: String,
    require: true
  }],
  tags: [{
    type: String
  }],
  description: {
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
  }
});

itemSchema.statics.findByID = function (id) {
  return this.find({
    _id: id
  });
};

module.exports = mongoose.model('Item', itemSchema);