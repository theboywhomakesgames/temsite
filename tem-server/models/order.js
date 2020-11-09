const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  buyer: {
    type: String,
    required: true
  },
  cart: [
    {
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
      price: {
        type: Number,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Order', orderSchema);