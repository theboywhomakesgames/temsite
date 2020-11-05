const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  is_seller:{
    type: Boolean,
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
    type: String,
  },
  address: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  items: [
    { itemId: String }
  ]
});

userSchema.statics.findByID = function(id) {
  return this.find({ _id: id });
}

userSchema.statics.findByUName = function(uname) {
  return this.find({ username: uname });
}

module.exports = mongoose.model('User', userSchema);