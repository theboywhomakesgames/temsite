const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  buyerUsername: {
    type: String,
    required: true
  },
  sellerUsername: {
    type: String,
    required: true
  },
  cart: [
    {
      itemId: {
        type: String,
        required: true
      },
      itemType: {
        type: Number,
        required: true
      },
      itemVariant: {
        type: Number,
        required: true
      }
    }
  ],
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  }
});